interface IAvatar {
    avatar: string
}

function Avatar({ avatar }: IAvatar) {
    return (
        <img
            alt="default_avatar.png"
            src="/default_avatar.png"
            className="inline-block size-8 rounded-full bg-gray-50"
        />
    )
}

export default Avatar