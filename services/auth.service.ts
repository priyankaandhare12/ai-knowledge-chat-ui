import { User, UserManager, UserManagerSettings } from 'oidc-client-ts';
import { config } from '@/config';

export class AuthService {
  private userManager: UserManager;

  constructor() {
    const settings: UserManagerSettings = {
      authority: config.oidc.authority,
      client_id: config.oidc.clientId,
      redirect_uri: config.oidc.redirectUri,
      post_logout_redirect_uri: config.oidc.postLogoutRedirectUri,
      response_type: config.oidc.responseType,
      scope: config.oidc.scope,
      automaticSilentRenew: config.oidc.automaticSilentRenew,
      includeIdTokenInSilentRenew: config.oidc.includeIdTokenInSilentRenew,

      // Additional security settings
      loadUserInfo: true,
      monitorSession: true,
      silent_redirect_uri: window.location.origin + '/auth/silent-callback',

      // Token management
      accessTokenExpiringNotificationTimeInSeconds: 300, // Notify 5 minutes before expiry
    };

    this.userManager = new UserManager(settings);

    // Set up event listeners
    this.setupEventListeners();
  }

  private setupEventListeners() {
    this.userManager.events.addUserLoaded((user: User) => {
      console.log('User loaded:', user.profile);
    });

    this.userManager.events.addUserUnloaded(() => {
      console.log('User unloaded');
    });

    this.userManager.events.addAccessTokenExpiring(() => {
      console.log('Access token expiring');
    });

    this.userManager.events.addAccessTokenExpired(() => {
      console.log('Access token expired');
    });

    this.userManager.events.addSilentRenewError(error => {
      console.error('Silent renew error:', error);
    });

    this.userManager.events.addUserSignedOut(() => {
      console.log('User signed out');
    });
  }

  // Authentication methods
  async login(): Promise<void> {
    try {
      await this.userManager.signinRedirect();
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  async logout(): Promise<void> {
    try {
      await this.userManager.signoutRedirect();
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  }

  async handleCallback(): Promise<User | null> {
    try {
      const user = await this.userManager.signinRedirectCallback();
      return user;
    } catch (error) {
      console.error('Callback error:', error);
      throw error;
    }
  }

  async handleSilentCallback(): Promise<void> {
    try {
      await this.userManager.signinSilentCallback();
    } catch (error) {
      console.error('Silent callback error:', error);
      throw error;
    }
  }

  // User management
  async getUser(): Promise<User | null> {
    try {
      return await this.userManager.getUser();
    } catch (error) {
      console.error('Get user error:', error);
      return null;
    }
  }

  async isAuthenticated(): Promise<boolean> {
    const user = await this.getUser();
    return user !== null && !user.expired;
  }

  async getAccessToken(): Promise<string | null> {
    const user = await this.getUser();
    return user?.access_token || null;
  }

  async renewToken(): Promise<User | null> {
    try {
      return await this.userManager.signinSilent();
    } catch (error) {
      console.error('Token renewal error:', error);
      throw error;
    }
  }

  // Utility methods
  getUserProfile(): any {
    return this.getUser().then(user => user?.profile || null);
  }

  async removeUser(): Promise<void> {
    await this.userManager.removeUser();
  }
}

// Create singleton instance
export const authService = new AuthService();
