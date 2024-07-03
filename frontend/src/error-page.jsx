import { useRouteError } from "react-router-dom";
import { useTranslation } from "react-i18next";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

export default function ErrorPage() {
  const { t } = useTranslation();
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
            <h1>{t("interface.notFound")}</h1>
            <p className="text-left">
              {t("interface.errorPageBody")}{" "}
              <a href="/login">{t("interface.errorPageLink")}</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
