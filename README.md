# RedwoodSDK Starter

## Tech Stack

| Category  | Tool                                                                         | Description                                 |
| --------- | ---------------------------------------------------------------------------- | ------------------------------------------- |
| Framework | [RedwoodSDK](https://docs.rwsdk.com/)                                        | Full-stack framework for Cloudflare Workers |
| ORM       | [Drizzle ORM](https://orm.drizzle.team/)                                     | TypeScript ORM with migrations              |
| Auth      | [Better Auth](https://www.better-auth.com/)                                  | Authentication library                      |
| UI        | [shadcn/ui](https://ui.shadcn.com/) + [Base UI](https://base-ui.com/)        | Accessible component primitives             |
| Styling   | [Tailwind CSS](https://tailwindcss.com/)                                     | Utility-first CSS framework                 |
| Forms     | [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)    | Form handling and validation                |
| Icons     | [Phosphor Icons](https://phosphoricons.com/) + [Lucide](https://lucide.dev/) | Icon libraries                              |
| Linting   | [Biome](https://biomejs.dev/)                                                | Linter and formatter                        |
| CI/CD     | [GitHub Actions](https://github.com/features/actions)                        | Automated deployment pipeline               |

## Running the dev server

```shell
pnpm run dev
```

Point your browser to the URL displayed in the terminal (e.g. `http://localhost:5173/`). You should see the RedwoodSDK welcome page in your browser.

## Deployment

### CI/CD Pipeline

Pushing to `main` triggers the GitHub Actions workflow (`.github/workflows/deploy.yml`) which runs the following steps in order:

1. **Install** — `pnpm install --frozen-lockfile`
2. **Lint** — `pnpm run lint`
3. **Type Check** — `pnpm run check`
4. **Migrate** — `pnpm run migrate:prod` (applies D1 migrations to production)
5. **Build** — `pnpm run build`
6. **Deploy** — `wrangler deploy` (deploys to Cloudflare Workers)

### Manual Deployment

> [!CAUTION]
> Manual deployment is not recommended. Always prefer the CI/CD pipeline to ensure consistent and safe deployments.

```shell
pnpm run migrate:prod
pnpm run release
```

### GitHub Secrets

> [!NOTE]
> The following secrets are required for CI deployment.

| Secret                  | Description                          |
| ----------------------- | ------------------------------------ |
| `CLOUDFLARE_API_TOKEN`  | API token with Workers and D1 access |
| `CLOUDFLARE_ACCOUNT_ID` | Your Cloudflare account ID           |

#### Cloudflare API Token

1. Go to [Cloudflare Dashboard → API Tokens](https://dash.cloudflare.com/profile/api-tokens)
2. Click **Create Token**
3. Use the **"Edit Cloudflare Workers"** template
4. Add the following permission: **Account → Cloudflare D1 → Edit**
5. Save the token

#### Cloudflare Account ID

1. Go to the [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Select your account → **Workers & Pages**
3. Copy the **Account ID** from the right sidebar

#### Adding secrets to GitHub

1. Go to **Settings → Environments → Production**
2. Add both `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`

## Further Reading

- [RedwoodSDK Documentation](https://docs.rwsdk.com/)
- [Cloudflare Workers Documentation](https://developers.cloudflare.com/workers)
