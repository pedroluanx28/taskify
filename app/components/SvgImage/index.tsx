import { FC } from 'react';
import { SvgProps } from 'react-native-svg';

type Props = SvgProps & {
    icon: FC<SvgProps>;
}

export function SvgImage({ icon: Icon, ...rest }: Props) {
    return (
        <Icon {...rest} />
    );
}