import { SvgXml, XmlProps } from 'react-native-svg';

interface IconProps extends XmlProps {
  width?: string;
  height?: string;
  xml: string;
  color?: string;
}

export const Icon = ({
  width = '24',
  height = '24',
  xml,
  color: colorProp,
  ...props
}: IconProps) => {
  return (
    <SvgXml
      color={colorProp}
      width={width}
      height={height}
      xml={xml}
      {...props}
    />
  );
};
