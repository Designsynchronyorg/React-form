import { useParams } from 'react-router-dom';

export function dynamicComponent(Component) {
    return props => <Component {...props} params={useParams()} />;
}
