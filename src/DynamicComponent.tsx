import { useParams } from "react-router-dom";

export function dynamicComponent(Component) {
  return (props: any) => <Component {...props} params={useParams()} />;
}
