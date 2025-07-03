declare namespace NodeJS {
  interface Process {
    env: {
      NODE_ENV: 'development' | 'production' | 'test';
      USE_FAKE_BACKEND?: string;
    };
  }
}
