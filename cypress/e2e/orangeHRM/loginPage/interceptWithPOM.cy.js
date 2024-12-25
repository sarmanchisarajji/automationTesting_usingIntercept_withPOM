/// <reference types="cypress"/>
import loginPage from "../../../pom/orangeHRM/loginPage/login";

describe("Login Feature", () => { 
    beforeEach(() => {
        // Mengakses halaman login sebelum setiap test case
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
        loginPage.textLogin().should('have.text', 'Login')
    });

    it("TC_001: User login with valid credentials", () => {
        loginPage.inputUsername().type('admin')
        loginPage.inputPassword().type('admin123')

        const startTime = new Date().getTime()

        cy.intercept("GET", "**/employees/action-summary").as("intercept")
        loginPage.buttonLogin().click()

        cy.wait("@intercept").then((intercept) => {
            expect(intercept.response.statusCode).to.equal(200)

            const endTime = new Date().getTime()
            const duration = endTime - startTime

            expect(duration).to.be.lessThan(6000)

            expect(intercept.response.body).to.have.property('data').and.to.be.an('array')

            expect(intercept.response.body.data[0]).to.have.property('group').and.to.be.equal('Pending Self Reviews')

            expect(intercept.response.body.data).to.have.length.greaterThan(0);

            intercept.response.body.data.forEach((item) => {
                expect(item).to.have.property('id').and.to.be.a('number');
                expect(item).to.have.property('group').and.to.be.a('string');
                expect(item).to.have.property('pendingActionCount').and.to.be.a('number');

            expect(intercept.response.body).to.have.property('meta').and.to.be.an('array');
            expect(intercept.response.body).to.have.property('rels').and.to.be.an('array');
            });
        })
        loginPage.menuDashboard().should('have.text', 'Dashboard');
    });

    it("TC_002: User login with valid username and incorrect password", () => {
        loginPage.inputUsername().type('admin')
        loginPage.inputPassword().type('admin1234')

        const startTime = new Date().getTime()

        cy.intercept("GET", "**/core/i18n/messages").as("messagesIncorrectPassword")
        loginPage.buttonLogin().click()

        cy.wait("@messagesIncorrectPassword").then((intercept) => {
            
            const endTime = new Date().getTime()
            const duration = endTime - startTime

            expect(intercept.response.statusCode).to.equal(304)

            expect(duration).to.be.lessThan(5000)
        })

        loginPage.invalidCredentials().should('contain', 'Invalid credentials')
    })

    it("TC_003: User login with incorrect username and valid password", () => {
        loginPage.inputUsername().type('admin1')
        loginPage.inputPassword().type('admin123')

        const startTime = new Date().getTime()

        cy.intercept("GET", "**/core/i18n/messages").as("messagesIncorrectUsername")
        loginPage.buttonLogin().click()

        cy.wait("@messagesIncorrectUsername").then((intercept) => {
            
            const endTime = new Date().getTime()
            const duration = endTime - startTime

            expect(intercept.response.statusCode).to.equal(304)

            expect(duration).to.be.lessThan(5000)
        })

        loginPage.invalidCredentials().should('contain', 'Invalid credentials')
    })

    it("TC_004: User login with invalid credentials", () => {
        loginPage.inputUsername().type('admin1')
        loginPage.inputPassword().type('admin1234')

        const startTime = new Date().getTime()

        cy.intercept("GET", "**/core/i18n/messages").as("messagesInvalidCredentials")
        loginPage.buttonLogin().click()

        cy.wait("@messagesInvalidCredentials").then((intercept) => {
            
            const endTime = new Date().getTime()
            const duration = endTime - startTime

            expect(intercept.response.statusCode).to.equal(304)

            expect(duration).to.be.lessThan(5000)
        })

        loginPage.invalidCredentials().should('contain', 'Invalid credentials')
    })

    // Ketika username atau password kosong, hanya perlu memvalidasi UI saja karena tidak mengirimkan permintaan ke endpoint(API)

    it("TC_005: User login with empty username and password", () => {
        loginPage.buttonLogin().click()
        loginPage.inputRequired().should('contain', 'Required').and('be.visible')
    })

    it("TC_006: User login with empty username and valid password", () => {
        loginPage.inputPassword().type('admin123')
        loginPage.buttonLogin().click()
        loginPage.inputRequired().should('contain', 'Required').and('be.visible')
    })

    it("TC_007: User login with valid username and empty password", () => {
        loginPage.inputUsername().type('admin')
        loginPage.buttonLogin().click()
        loginPage.inputRequired().should('contain', 'Required').and('be.visible')
    })

    it("TC_008: User login with empty username and incorrect password", () => {
        loginPage.inputPassword().type('admin1234')
        loginPage.buttonLogin().click()
        loginPage.inputRequired().should('contain', 'Required').and('be.visible')
    })

    it("TC_009: User login with incorrect username and empty password", () => {
        loginPage.inputUsername().type('admin1')
        loginPage.buttonLogin().click()
        loginPage.inputRequired().should('contain', 'Required').and('be.visible')
    })

    it("TC_010: User navigates to Forgot Password page", () => {

        const startTime = new Date().getTime()

        cy.intercept("GET", "**/core/i18n/messages").as("messagesForgotPassword")
        loginPage.linkToForgoPassword().click()

        cy.wait("@messagesForgotPassword").then((intercept) => {
            
            const endTime = new Date().getTime()
            const duration = endTime - startTime

            expect(intercept.response.statusCode).to.equal(304)

            expect(duration).to.be.lessThan(5000)
        })

        cy.url().should('include', '/requestPasswordResetCode')
        loginPage.menuForgotPassword().should('have.text', 'Reset Password')
    })

    it('TC_011: Reset password link sent successfully', () => {
        loginPage.linkToForgoPassword().click()
        cy.url().should('include', '/requestPasswordResetCode')
        loginPage.menuForgotPassword().should('have.text', 'Reset Password')
        loginPage.inputUsernameForgotPassword().type('admin')

        const startTime = new Date().getTime()

        cy.intercept("GET", "**/core/i18n/messages").as("messagesForgotSuccess")
        loginPage.buttonResetPassword().click()

        cy.wait("@messagesForgotSuccess").then((intercept) => {
            
            const endTime = new Date().getTime()
            const duration = endTime - startTime

            expect(intercept.response.statusCode).to.equal(304)

            expect(duration).to.be.lessThan(5000)
        })
        loginPage.successResetPassword().should('have.text','Reset Password link sent successfully')
    })

    it('TC_012: Reset password with empty username', () => {
        loginPage.linkToForgoPassword().click()
        cy.url().should('include', '/requestPasswordResetCode')
        loginPage.menuForgotPassword().should('have.text', 'Reset Password')
        loginPage.buttonResetPassword().click()
        loginPage.inputRequiredForgotPassword().should('have.text','Required').and('be.visible')
    })

    it('TC_013: Cancel reset password', () => {
        loginPage.linkToForgoPassword().click()
        cy.url().should('include', '/requestPasswordResetCode')

        const startTime = new Date().getTime()

        cy.intercept("GET", "**/core/i18n/messages").as("messagesCancelReset")
        loginPage.buttonCancelResetPassword().click()

        cy.wait("@messagesCancelReset").then((intercept) => {
            
            const endTime = new Date().getTime()
            const duration = endTime - startTime

            expect(intercept.response.statusCode).to.equal(304)

            expect(duration).to.be.lessThan(5000)
        })

        cy.url().should('include', '/login')
        loginPage.textLogin().should('have.text', 'Login')
    })

})
