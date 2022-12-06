import { Link } from "react-router-dom";

const Images = ({ profile, open, url }) => {

    const coverPictures = profile.images.filter(im => im.type !== 'profile') || [];
    const profilePictures = profile.images.filter(im => im.type !== 'cover') || [];



    return (
        <div className="Container">
            <div className="wrapper">
                <div className="upload-images">
                    {profile.images.length > 0 && <h2 className="title">{profile.username} pictures</h2>}
                    <div className="profile-pics">
                        {profilePictures.length > 0 && <h3 className="title">Profile pictures</h3>
                        }                        {profilePictures.map(pic => <Link to={`/profile/${profile._id}/gallery`} key={pic.image} className="link"><img src={url + pic.image} alt={pic.image} /></Link>)}
                    </div>
                    <div className="cover-pics">
                        {coverPictures.length > 0 && <h3 className="title">Cover pictures</h3>}
                        {coverPictures.map(pic => <Link to={`/profile/${profile._id}/gallery`} key={pic.image} className="link"><img src={url + pic.image} alt={pic.image} /></Link>)}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Images