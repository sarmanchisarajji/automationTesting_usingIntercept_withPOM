export default class loginPage {
    static textLogin(){
        return cy.get('[class="oxd-text oxd-text--h5 orangehrm-login-title"]')
    }

    static inputUsername(){
        return cy.get('[name="username"]')
    }

    static inputPassword(){
        return cy.get('[name="password"]')
    }

    static buttonLogin(){
        return cy.get('[type="submit"]')
    }

    static menuDashboard(){
        return cy.get('[class="oxd-text oxd-text--h6 oxd-topbar-header-breadcrumb-module"]')
    }

    static invalidCredentials(){
        return cy.get('[class="oxd-alert oxd-alert--error"]')
    }

    static inputRequired(){
        return cy.get('[class="oxd-text oxd-text--span oxd-input-field-error-message oxd-input-group__message"]')
    }

    static URLForgotPassword(){
        return cy.url()
    }

    static linkToForgoPassword(){
        return cy.get('[class="oxd-text oxd-text--p orangehrm-login-forgot-header"]')
    }

    static menuForgotPassword(){
        return cy.get('[class="oxd-text oxd-text--h6 orangehrm-forgot-password-title"]')
    }

    static inputUsernameForgotPassword(){
        return cy.get('[name="username"]')
    }

    static buttonResetPassword(){
        return cy.get('[type="submit"]')
    }

    static successResetPassword(){
        return cy.get('[class="oxd-text oxd-text--h6 orangehrm-forgot-password-title"]')
    }

    static inputRequiredForgotPassword(){
        return cy.get('[class="oxd-text oxd-text--span oxd-input-field-error-message oxd-input-group__message"]')
    }

    static buttonCancelResetPassword(){
        return cy.get('[type="button"]')
    }
}