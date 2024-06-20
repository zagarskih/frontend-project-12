import { useRouteError } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div
      className="h-100 bg-light d-flex align-items-center justify-content-center"
      id="error-page"
    >
      <div className="container">
        <div className="row d-flex align-items-center justify-content-center">
          <div className="col-md-4">
            <img src="/errorPage.webp" className="img-fluid" alt="Error" />
          </div>
          <div className="col-md-4">
            <h1>Страница не найдена</h1>
            <p className="text-left">
              Но вы можете перейти на <a href="/login">главную страницу</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
