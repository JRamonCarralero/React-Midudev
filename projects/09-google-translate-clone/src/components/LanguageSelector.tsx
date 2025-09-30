import { Form } from "react-bootstrap"
import { AUTO_LANGUAGE, SUPPORTED_LANGUAGES } from "../constants"
import { type FromLanguage, type Language, SectionType } from "../types.d"

type Props = 
  | { type: SectionType.From, value: FromLanguage, onChange: (language: FromLanguage) => void }
  | { type: SectionType.To, value: Language, onChange: (language: Language) => void }

export const LanguageSelector: React.FC<Props> = ({ onChange, value, type }) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value)
  }

  return (
    <Form.Select aria-label="Selecciona el idioma" onChange={handleChange} value={value as string}>
      {type === SectionType.From && <option value={AUTO_LANGUAGE}>Auto</option>}
      {Object.entries(SUPPORTED_LANGUAGES).map(([key, value]) => (
        <option key={key} value={key} onClick={() => onChange(key)}>
          {value}
        </option>
      ))}
    </Form.Select>
  )
}