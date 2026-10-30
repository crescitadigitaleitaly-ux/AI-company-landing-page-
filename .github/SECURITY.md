# Security model

This is a static portfolio concept, with no backend, accounts, payments, uploads, analytics or inquiry-delivery service. Form interactions simulate a response locally; the form is disabled until JavaScript is active. Generated deployment headers also block native form submission.

Do not add secrets to this repository. Environment files and hosting connection details are ignored. Report a potential vulnerability privately through the repository owner's GitHub profile rather than posting credentials or personal information in an issue.

Run `npm audit`, `npm run build`, and the browser suite before releases. `npm run preview:release` serves the build with the intended security headers for verification. Actual production headers must be checked after uploading to Hostinger; local tests alone do not prove hosting configuration.
