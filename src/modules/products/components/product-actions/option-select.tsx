import { HttpTypes } from "@medusajs/types"
import { clx } from "@medusajs/ui"
import React from "react"

type OptionSelectProps = {
  option: HttpTypes.StoreProductOption
  current: string | undefined
  updateOption: (title: string, value: string) => void
  title: string
  disabled: boolean
  "data-testid"?: string
}

const OptionSelect: React.FC<OptionSelectProps> = ({
  option,
  current,
  updateOption,
  title,
  "data-testid": dataTestId,
  disabled,
}) => {
  const filteredOptions = (option.values ?? []).map((v) => v.value)

  return (
    <div className="flex flex-col gap-y-3">
      <span className="text-xs uppercase tracking-[0.2em] text-ui-fg-subtle">
        {title}
      </span>
      <div className="flex flex-wrap gap-3" data-testid={dataTestId}>
        {filteredOptions.map((v) => {
          return (
            <button
              onClick={() => updateOption(option.id, v)}
              key={v}
              className={clx(
                "h-11 min-w-[3rem] rounded-base border px-4 text-sm transition-all duration-200 ease-out",
                {
                  "border-ui-fg-interactive bg-[var(--color-gold-soft)] text-ui-fg-base":
                    v === current,
                  "border-ui-border-base bg-ui-bg-subtle text-ui-fg-subtle hover:border-[var(--color-border-strong)] hover:text-ui-fg-base":
                    v !== current,
                }
              )}
              disabled={disabled}
              data-testid="option-button"
            >
              {v}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default OptionSelect
