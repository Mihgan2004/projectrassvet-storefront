import { Button, Heading, Text } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const SignInPrompt = () => {
  return (
    <div className="card-brand flex flex-col items-start justify-between gap-4 p-6 small:flex-row small:items-center">
      <div>
        <Heading
          level="h2"
          className="text-lg font-medium text-[var(--color-text)]"
        >
          Уже есть аккаунт?
        </Heading>
        <Text className="mt-1 text-sm text-[var(--color-muted)]">
          Войдите, чтобы оформлять заказы быстрее.
        </Text>
      </div>
      <div>
        <LocalizedClientLink href="/account">
          <Button
            variant="secondary"
            className="!rounded-rounded !border-[var(--color-border-strong)] !bg-transparent !text-[var(--color-text)] hover:!bg-[var(--color-gold-soft)]"
            data-testid="sign-in-button"
          >
            Войти
          </Button>
        </LocalizedClientLink>
      </div>
    </div>
  )
}

export default SignInPrompt
