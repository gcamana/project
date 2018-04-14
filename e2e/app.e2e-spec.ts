import { AppnewPage } from './app.po';

describe('appnew App', () => {
  let page: AppnewPage;

  beforeEach(() => {
    page = new AppnewPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
