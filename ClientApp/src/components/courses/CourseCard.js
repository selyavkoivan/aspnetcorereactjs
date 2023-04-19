import {Badge, Col} from "reactstrap";

export function CourseCard(props) {
    return (
        <>
            <a className="form-control pb-2 text-decoration-none text-dark"
               href={`/courses/${props.courseId}`}>
                <h3 style={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    height: '1.2em'
                }}>{props.courseName}</h3>
                <p style={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    height: '3.6em'
                }}>{props.courseDescription}</p>
                {props.tags.map(tag => (
                    <span>
            <Badge>{tag.tagName}</Badge>{' '}
          </span>
                ))}
            </a>
        </>
    );
}
