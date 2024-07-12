import { useRouteError } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ChatHeader from "../elements/HeaderChat";

export default function ErrorPage() {
  const { t } = useTranslation();
  const error = useRouteError();
  console.error(error);

  return (
    <div className="h-100 bg-light d-flex flex-column">
      <ChatHeader />
      <div
        className="h-100 bg-light d-flex align-items-center justify-content-center flex-grow-1"
        id="error-page"
      >
        <div className="container">
          <div className="row d-flex align-items-center justify-content-center">
            <div className="col-md-4">
              <img src="/error.png" className="img-fluid" alt="Error" />
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
    </div>
  );
}
