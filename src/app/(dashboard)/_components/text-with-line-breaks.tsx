import { Fragment } from 'react'

type Props = {
  text: string
}
export const TextWithLineBreaks = ({ text }: Props) => {
  // Replace "\n\n" with "<br />" tags
  const formatText = (text: string) => {
    return text.split('\n\n').map((part, index) => (
      <Fragment key={index}>
        {part}
        <br />
      </Fragment>
    ))
  }

  return formatText(text)
}
