import { DiningCoordinatorPage } from './app.po';

describe('dining-coordinator App', () => {
  let page: DiningCoordinatorPage;

  beforeEach(() => {
    page = new DiningCoordinatorPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
