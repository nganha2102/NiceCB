const ICON = {
    chevron_drop_down: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0_52_1438)">
    <path d="M7.11502 8.29508L5.70502 9.70508L11.705 15.7051L17.705 9.70508L16.295 8.29508L11.705 12.8751L7.11502 8.29508Z" fill="#0C1119"/>
    </g>
    <defs>
    <clipPath id="clip0_52_1438">
    <rect width="24" height="24" fill="white"/>
    </clipPath>
    </defs>
    </svg>`,
};

export default function SvgIcon({
    name,
    size = 24,
    color = 'currentColor',
    width,
    height,
    style,
    ...props
}) {
    const svg = ICON[name];

    if (!svg) {
        return null;
    }

    const w = width ?? size;
    const h = height ?? size;

    const markup = svg
        .replace(/<svg([^>]*)>/, (_, attrs) => {
            const cleaned = attrs
                .replace(/\swidth="[^"]*"/, '')
                .replace(/\sheight="[^"]*"/, '');
            return `<svg width="${w}" height="${h}"${cleaned}>`;
        })
        .replace(/(fill|stroke)="#[0-9a-fA-F]{3,8}"/g, '$1="currentColor"');

    return (
        <span
            role="img"
            aria-hidden="true"
            style={{
                display: 'inline-flex',
                width: w,
                height: h,
                color,
                ...style,
            }}
            dangerouslySetInnerHTML={{ __html: markup }}
            {...props}
        />
    );
}
