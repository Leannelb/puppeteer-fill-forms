import faker from 'faker'
import puppeteer from 'puppeteer'

const appUrlBase = 'http://localhost:4000'
const routes = {
  public: {
    register: `${appUrlBase}/register`,
    login: `${appUrlBase}/login`,
    noMatch: `${appUrlBase}/asdf`,
  },
  private: {
    events: appUrlBase,
    alerts: `${appUrlBase}/alerts`,
    services: `${appUrlBase}/services`,
    team: `${appUrlBase}/team`,
  },
  admin: {
    templates: `${appUrlBase}/templates`,
  },
}

const user = {
  email: faker.internet.email(),
  password: 'test',
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  mobile: faker.phone.phoneNumber(),
  companyName: faker.company.companyName(),
}

let browser
let page
beforeAll(async () => {
  browser = await puppeteer.launch(
    process.env.DEBUG
      ? {
          headless: false,
          slowMo: 100,
        }
      : {}
  )
  page = await browser.newPage()
})

describe('private routes', () => {
  test('redirects to login route when logged out', async () => {
    await page.goto(routes.private.events)
    await page.waitForSelector('[data-testid="userLoginForm"]')
  })
})

describe('registration', () => {
  test('can get to register route from login form', async () => {
    await page.click('[data-testid="registerLink"]')
    await page.waitForSelector('[data-testid="userAccountForm"]')
  })

  test('can create new user account', async () => {
    await page.goto(routes.public.register)
    await page.waitForSelector('[data-testid="userAccountForm"]')
    await page.click('[data-testid="userRegisterInputWithEmail"]')
    await page.type(user.email)
    await page.click('[data-testid="userRegisterInputWithPassword"]')
    await page.type(user.password)
    await page.click('[data-testId="userAccountSubmitButton"]')
    await page.waitForSelector('[data-testid="userSettingsForm"]')
  })

  test('logs in and redirects to events route when registration is complete', async () => {
    await page.waitForSelector('[data-testid="events"]')
  })
})

describe('logout', () => {
  test('can logout', async () => {
    await page.waitForSelector('[data-testid="userMenuButton"]')
    await page.click('[data-testid="userMenuButton"]')
    await page.waitForSelector('[data-testid="userMenuOpen"]')
    await page.click('[data-testid="logoutLink"]')
    await page.waitForSelector('[data-testid="userLoginForm"]')
  })
})

describe('login', () => {
  test('can login', async () => {
    await page.waitForSelector('[data-testid="userLoginInputWithEmail"]')
    await page.click('[data-testid="userLoginInputWithEmail"]')
    await page.type(user.email)
    await page.click('[data-testid="userLoginInputWithPassword"]')
    await page.type(user.password)
    await page.click('[data-testid="userLoginSubmitButton"]')
    await page.waitForSelector('[data-testid="events"]')
  })
})

describe('on call', () => {
  test('starts off call', async () => {
    await page.waitForSelector('[data-testid="offCallStatus"]')
  })

  test('can toggle on call status', async () => {
    await page.click('[data-testid="onCallButton"]')
    await page.waitForSelector('[data-testid="onCallStatus"]')
  })

  test('shows on call list with alerts', async () => {
    await page.goto(routes.private.alerts)
    await page.waitForSelector('[data-testid="someOnCallButton"]')
    await page.click('[data-testid="someOnCallButton"]')
    await page.waitForSelector('[data-testid="onCallBadge"]')
  })

  test('shows on call badge in team list', async () => {
    await page.goto(routes.private.team)
    await page.waitForSelector('[data-testid="onCallBadge"]')
  })
})

describe('errors', () => {
  test(`shows 404 message when route doesn't exist`, async () => {
    await page.goto(routes.public.noMatch)
    await page.waitForSelector('[data-testid="noMatch"]')
  })
})

describe('admin', () => {
  test('redirects to root route when not an admin', async () => {
    await page.goto(routes.admin.templates)
    await page.waitForSelector('[data-testid="events"]')
  })
})

afterAll(() => {
  if (!process.env.DEBUG) {
    browser.close()
  }
})