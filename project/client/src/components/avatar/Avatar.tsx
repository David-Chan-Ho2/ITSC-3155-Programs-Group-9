interface IAvatar {
    avatar: string
}

function Avatar({ avatar }: IAvatar) {
    return (
        <img
            alt=""
            src={avatar}
            className="inline-block size-8 rounded-full bg-gray-50"
        />
    )
}

export default Avatar