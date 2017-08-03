import { CtAppPage } from './app.po';

describe('ct-app App', () => {
  let page: CtAppPage;

  beforeEach(() => {
    page = new CtAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
