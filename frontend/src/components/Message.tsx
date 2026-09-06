interface MessageProps {
    children: React.ReactNode;
}

function Message({
    children,
}: MessageProps) {
    return (
        <p role="alert">
            {children}
        </p>
    );
}

export default Message;