import uniLogo from "images/uni-blog.png";
import uniLogoBlack from "images/uni-blog-black.png";


const ApplicationLogo = (props) => (
    <>
        {props.dark ? (
            <img alt="Uni Blog" src={uniLogo} {...props} />
        ) : (
            <img alt="Uni Blog" src={uniLogoBlack} {...props} />
        )}
    </>
);

export default ApplicationLogo;
