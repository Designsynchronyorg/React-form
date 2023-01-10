import { useParams } from "react-router-dom";

export function dynamicComponent(Component: any) {
  return (props: any) => <Component {...props} params={useParams()} />;
}
