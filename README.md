# Bravo Wallet Transfer Analysis Board

A static, GitHub Pages–ready HTML/CSS/JavaScript website embedding **13 Tableau Public worksheets**: 6 under Services Analysis and 7 under Customer Analysis. Start date: **November 1, 2026**.

## Deploy to GitHub Pages

1. Download and unzip `bravo-wallet-transfer-site.zip`.
2. Create a GitHub repository, for example `bravo-wallet-transfer-board`.
3. Upload `index.html`, `styles.css`, and `app.js` to the **root** of the repository (the README is optional). Do **not** upload only the ZIP.
4. In your repository, open **Settings → Pages → Build and deployment**. Choose **Deploy from a branch**, select **main** and **/(root)**, then **Save**.
5. Open the GitHub Pages URL shown in Settings → Pages (typically `https://YOUR-USERNAME.github.io/bravo-wallet-transfer-board/`).

No build tools, server, API keys, or dependencies on your own machine are required. The website requires an internet connection to load Tableau views.

## Included views

**Services**
1. Transactions Amount (SDG) — `TransactionsamountSDG`
2. Total Transactions Count — `Totaltransactioncount`
3. Average Ticket (SDG) — `AverageticketSDG_1`
4. Service Share of Value — `ServiceShareofValue`
5. Services Daily Totals — `Servicesdailytotals`
6. Service Transactions per Day — `Sheet6`

**Customers**
1. Customers — `Customersinextract`
2. Registered in November — `RegisteredinNov`
3. Active Users by Day — `Sheet9`
4. Wallet Class Mix (All Customers) — `Sheet102`
5. Wallet Class Share of Transaction Value — `WalletClassShareofValue2`
6. Customers by State — `Sheet10`
7. Unknown State — `Stateunknown`

## How filters work (important)

The filter controls are real controls implemented using the [Tableau Embedding API v3](https://help.tableau.com/current/api/embedding_api/en-us/docs/embedding_api_filter.html), **not** static decorations. However, Tableau can only filter a sheet if its published workbook exposes matching fields.

- **Date range** appears in both tabs; defaults to Nov 1–11, 2026. On Services it attempts transaction dates; on the Customers extract count it does not apply a date (snapshot measure); on customer registration it attempts registration date; on daily active users and transaction-share views it attempts transaction date. Snapshot-only distribution views are intentionally not date-filtered, since their date semantics are unknown.
- **Service type** appears only in Services and tries to filter transaction KPIs and daily trends. The *Service Share of Value* comparison stays unfiltered by individual service to avoid misleading 100% shares.
- **Wallet class** appears only in Customers and attempts to filter the Customers extract count, registrations, active users and geographic views. The *Wallet Class Mix* and *Wallet Class Share* comparison charts deliberately remain unfiltered by class so they still show the full distribution.
- **Reset** returns website controls to their defaults, and clears the categorical filters applied by this website. Native Tableau filters used manually inside charts may need separate clearing.

The code tests a set of possible field names in `FILTER_FIELDS` near the top of `app.js`. For consistent behavior, open the Tableau worksheets, make sure the relevant fields exist, and edit these field names to match exactly, such as `tran_date`, `Service Type`, `account_class`, or `Registration Date`. If Tableau rejects a field, the status beneath the chart reports that the filter is unavailable; it does **not** claim the chart was filtered.

The Embedding API cannot infer business semantics, and cannot automatically make snapshot customer counts into historical per-day counts. The sheet name `WalletClassShareofValue2` suggests a *value* metric, while the original description used “share of transactions”; the site uses *Transaction Value* until you confirm the calculation.

## Data refresh

Charts embed the **published Tableau Public views**, so they show the latest data currently available in Tableau when loaded/refreshed. Updating the Google Sheet does not necessarily update Tableau immediately: the Tableau Public extract must refresh first. GitHub Pages does not refresh the Tableau source. Refresh the website/browser to obtain the latest Tableau view (subject to provider/cache timing).

## Privacy

GitHub Pages websites and Tableau Public workbooks are **publicly accessible**. Do not publish sensitive customer IDs, personally identifiable information, private financial details, or internal-only dashboards. Hiding a Tableau Public visualization from your profile does not make it private.

## Customizing

- `index.html`: title, description, layout and navigation.
- `styles.css`: color scheme, spacing, sizing and mobile responsiveness.
- `app.js`: Tableau sheet URLs, worksheet titles, placement, chart heights, and filter field names.

Official documentation: https://help.tableau.com/current/api/embedding_api/en-us/docs/embedding_api_basic.html

## Layout revision (November 11)
- The customer summary row contains **All Active Customers** (existing `Customersinextract` published view, renamed in the site only), **Registered in November**, and **Unknown State**. The underlying Tableau view/calculations were not altered.
- Services headline row contains **Transactions Amount**, **Total Transactions Count**, and **Average Ticket** in shorter cards.
- Embedded Tableau toolbars are configured as hidden, and the site's status/link footer is not shown.
- Tableau Public remains a public hosting service: hiding its embed toolbar does not restrict access to the original visualization.
- The existing `Sheet9` daily-active-users chart remains separately under Daily customer activity.


## Filter troubleshooting (November 2026 revision)

The dropdown now sends the service labels shown in the provided Tableau screenshot: `Send Wallet Transfer`, `Receive via QR`, `Transfer Via NFC`, and `Bravo Cash Code`. The `Services` field name is now tried first. The filter bar displays which chart failed rather than relying on hidden per-chart footers.

**Not yet validated against live Tableau:** Field captions, date fields, and wallet-class values can differ by published worksheet. Open the specific view in Tableau and confirm exact field names. Tableau must expose the filterable field in the underlying view. The website cannot filter a snapshot by transaction date if that field is missing. The Tableau Public workbook must be published and loaded before filters are applied.

If the sheet is on a different data source, you may need to use its Tableau-specific caption in `FILTER_FIELDS` or separate field mappings for each view. Service Share of Value and wallet class comparisons intentionally stay unfiltered by their own categorical comparison field.


## Filter troubleshooting update (November 12)
- The native Tableau Service filter (singular) and known labels are used first.
- If the published view exposes native Service/Wallet Class quick-filter domains, its additional choices are added to the website dropdown automatically. The supplied screenshot truncates two 'Send Wallet Transfe...' labels, so their exact untruncated values must be checked in Tableau.
- Service/Wallet filters no longer depend on a successful date filter. Date range filtering begins only after the date controls are changed.
- A visible message beneath the website filters reports failed Tableau field operations, instead of silently saying everything worked.
- Some worksheet snapshots do not contain wallet-class/service fields and cannot be forced to filter.
- The website remains public if hosted on GitHub Pages and the views are Tableau Public.


## November 14 service-category correction

The **Service type** dropdown now has five independent Tableau field values:
`Bravo Cash Code`, `Receive via QR`, `Send Wallet Transfer Debit`,
`Send Wallet Transfer Credit`, and `Transfer Via NFC`. Debit and Credit
are distinct selections and are never merged by the website. The filter
uses the `Service` field first, with a fallback list for compatible published
worksheets. Where available, Tableau's native domain is used to preserve
the precise casing of values. Wallet-class filtering is retained.

**Deployment:** Replace `index.html`, `app.js`, and `styles.css` in your
GitHub Pages repository, then hard refresh the site. Test both directions
separately. Each published Tableau worksheet must actually contain the
`Service` (or wallet-class) field for filtering to succeed. A website
cannot add a missing dimension to the published Tableau view.

**Verification limitation:** JavaScript syntax and packaged file references
were checked; the live Tableau Public data cannot be authenticated or
end-to-end tested from this package. See the message below the filters
if a particular worksheet rejects a field or value.
