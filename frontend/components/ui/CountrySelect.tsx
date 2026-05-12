'use client'

import Select, { components, OptionProps, SingleValueProps, PlaceholderProps } from 'react-select'
import { Country } from 'country-state-city'

const ALL_COUNTRIES = Country.getAllCountries()

const flagUrl = (isoCode: string) =>
  `https://purecatamphetamine.github.io/country-flag-icons/3x2/${isoCode}.svg`

interface CountryOption {
  value: string
  label: string
  phonecode: string
}

const OPTIONS: CountryOption[] = ALL_COUNTRIES.map(c => ({
  value: c.isoCode,
  label: c.name,
  phonecode: c.phonecode,
}))

// ─── Opción en el dropdown ────────────────────────────────────────────────────
const Option = (props: OptionProps<CountryOption>) => (
  <components.Option {...props}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <img
        src={flagUrl(props.data.value)}
        alt={props.data.label}
        width={20}
        height={14}
        style={{ borderRadius: 2, objectFit: 'cover', flexShrink: 0 }}
        onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
      />
      <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: 14, color: '#12303E' }}>
        {props.data.label}
      </span>
    </div>
  </components.Option>
)

// ─── Valor seleccionado (muestra bandera + nombre) ───────────────────────────
const SingleValue = (props: SingleValueProps<CountryOption>) => (
  <components.SingleValue {...props}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <img
        src={flagUrl(props.data.value)}
        alt={props.data.label}
        width={20}
        height={14}
        style={{ borderRadius: 2, objectFit: 'cover', flexShrink: 0 }}
        onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
      />
      <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: 14, color: '#12303E' }}>
        {props.data.label}
      </span>
    </div>
  </components.SingleValue>
)

// ─── Placeholder con ícono de ubicación (solo cuando no hay valor) ───────────
const CountryPlaceholder = (props: PlaceholderProps<CountryOption>) => (
  <components.Placeholder {...props}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <img
        src="/icons/icon-location.svg"
        alt=""
        width={15}
        height={15}
        style={{ display: 'block', flexShrink: 0 }}
      />
      <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: 14, color: '#9EADB4' }}>
        {String(props.children)}
      </span>
    </div>
  </components.Placeholder>
)

// ─── Estilos custom ───────────────────────────────────────────────────────────
const selectStyles = {
  control: (base: object, state: { isFocused: boolean }) => ({
    ...base,
    height: 48,
    minHeight: 48,
    borderRadius: 8,
    border: `1.5px solid ${state.isFocused ? '#097589' : '#C3DED9'}`,
    boxShadow: state.isFocused ? '0 0 0 2px rgba(9,117,137,0.15)' : 'none',
    backgroundColor: '#fff',
    cursor: 'pointer',
    '&:hover': { borderColor: '#097589' },
  }),
  menu: (base: object) => ({
    ...base,
    borderRadius: 8,
    boxShadow: '2px 2px 16px rgba(9,52,78,0.12)',
    zIndex: 100,
  }),
  menuList: (base: object) => ({
    ...base,
    maxHeight: 220,
    padding: 4,
  }),
  option: (base: object, state: { isSelected: boolean; isFocused: boolean }) => ({
    ...base,
    borderRadius: 6,
    backgroundColor: state.isSelected ? '#097589' : state.isFocused ? '#EFF4F7' : 'transparent',
    color: state.isSelected ? '#fff' : '#12303E',
    padding: '8px 12px',
    cursor: 'pointer',
  }),
  placeholder: (base: object) => ({
    ...base,
    fontFamily: 'Poppins, sans-serif',
    fontSize: 14,
    color: '#9EADB4',
    margin: 0,
  }),
  input: (base: object) => ({
    ...base,
    fontFamily: 'Poppins, sans-serif',
    fontSize: 14,
    color: '#12303E',
  }),
  indicatorSeparator: () => ({ display: 'none' }),
  dropdownIndicator: (base: object) => ({
    ...base,
    color: '#5A6E77',
    padding: '0 8px',
  }),
}

// ─── Componente de país (ubicación) ──────────────────────────────────────────
interface CountrySelectProps {
  value: string
  onChange: (isoCode: string) => void
  placeholder?: string
  hasError?: boolean
  style?: React.CSSProperties
}

export function CountrySelect({
  value,
  onChange,
  placeholder = 'Selecciona un país',
  hasError,
}: CountrySelectProps) {
  const selected = OPTIONS.find(o => o.value === value) ?? null

  return (
    <Select
      options={OPTIONS}
      value={selected}
      onChange={(opt) => onChange((opt as CountryOption | null)?.value ?? '')}
      placeholder={placeholder}
      components={{ Option, SingleValue, Placeholder: CountryPlaceholder }}
      styles={{
        ...selectStyles,
        control: (base, state) => ({
          ...(selectStyles.control as Function)(base, state),
          borderColor: hasError ? '#A7170C' : state.isFocused ? '#097589' : '#C3DED9',
        }),
      } as object}
      isSearchable
      noOptionsMessage={() => 'No se encontró el país'}
    />
  )
}

// ─── Componente de prefijo telefónico ────────────────────────────────────────
const PhoneOption = (props: OptionProps<CountryOption>) => (
  <components.Option {...props}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <img
        src={flagUrl(props.data.value)}
        alt={props.data.label}
        width={20}
        height={14}
        style={{ borderRadius: 2, objectFit: 'cover', flexShrink: 0 }}
        onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
      />
      <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: 13, color: '#12303E' }}>
        +{props.data.phonecode}
      </span>
      <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: 12, color: '#5A6E77' }}>
        {props.data.label}
      </span>
    </div>
  </components.Option>
)

const PhoneSingleValue = (props: SingleValueProps<CountryOption>) => (
  <components.SingleValue {...props}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
      <img
        src={flagUrl(props.data.value)}
        alt={props.data.label}
        width={18}
        height={13}
        style={{ borderRadius: 2, objectFit: 'cover', flexShrink: 0 }}
        onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
      />
      <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: 13, color: '#12303E' }}>
        +{props.data.phonecode}
      </span>
    </div>
  </components.SingleValue>
)

interface PhoneCodeSelectProps {
  value: string
  onChange: (isoCode: string) => void
}

export function PhoneCodeSelect({ value, onChange }: PhoneCodeSelectProps) {
  const selected = OPTIONS.find(o => o.value === value) ?? null

  return (
    <div style={{ minWidth: 110, maxWidth: 130 }}>
      <Select
        options={OPTIONS}
        value={selected}
        onChange={(opt) => onChange((opt as { value: string } | null)?.value ?? '')}
        components={{ Option: PhoneOption, SingleValue: PhoneSingleValue }}
        styles={selectStyles as object}
        isSearchable
        noOptionsMessage={() => 'No encontrado'}
      />
    </div>
  )
}
