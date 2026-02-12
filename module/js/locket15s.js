// ========= ID ========= //
const mapping = {
  '%E8%BD%A6%E7%A5%A8%E7%A5%A8': ['vip+watch_vip'],
  'Locket': ['Gold']
};
// =========   Phần cố định  ========= // 
// =========  @anhtuaan.08 ========= // 

var ua = $request.headers["User-Agent"] || $request.headers["user-agent"];
var obj = JSON.parse($response.body);

// === FAKE APP STORE REGION US === //
obj.countryCode = "US";
obj.storefront = "143441";
obj.storefrontId = "143441-1";
obj.country = "United States";
obj.region = "USA";
obj.locale = "en_US";
obj.currency = "USD";
obj.currencySymbol = "$";

// === ATTENTION MESSAGE === //
obj.Attention = "🇺🇸 Chúc mừng bạn! Vui lòng không bán hoặc chia sẻ cho người khác!";

// === INIT SUBSCRIBER OBJECT === //
if (!obj.subscriber) obj.subscriber = {};
if (!obj.subscriber.entitlements) obj.subscriber.entitlements = {};
if (!obj.subscriber.subscriptions) obj.subscriber.subscriptions = {};
if (!obj.subscriber.other_purchases) obj.subscriber.other_purchases = {};
if (!obj.subscriber.non_subscriptions) obj.subscriber.non_subscriptions = {};

// === FAKE US LOCATION DATA === //
obj.subscriber.other_purchases["us_region"] = {
  "store_country": "US",
  "storefront": "143441",
  "country_code": "US",
  "locale": "en_US",
  "currency": "USD",
  "region": "United States",
  "time_zone": "America/New_York",
  "ip_country": "United States",
  "device_country": "US"
};

obj.subscriber.other_purchases["us_store"] = {
  "store": "app_store_us",
  "storefront_name": "United States",
  "storefront_id": "143441",
  "language": "en-US"
};

// === FAKE US SUBSCRIPTION DATA === //
var anhtuaan08 = {
  auto_resume_date: null,
  display_name: "Locket Gold - Yearly (US)",
  is_sandbox: false,
  ownership_type: "PURCHASED",
  billing_issues_detected_at: null,
  management_url: "https://apps.apple.com/account/subscriptions",
  period_type: "normal",
  price: {
    "amount": 29.99,
    "currency": "USD"
  },
  expires_date: "9999-12-31T23:59:59Z",
  grace_period_expires_date: null,
  refunded_at: null,
  unsubscribe_detected_at: null,
  original_purchase_date: "2026-01-09T10:10:15Z",
  purchase_date: "2026-01-09T10:10:14Z",
  store: "app_store",
  store_transaction_id: "2000001108724193",
  original_transaction_id: "2000001108724193",
  store_country: "USA",
  storefront: "143441",
  environment: "Production",
  in_app_ownership_type: "PURCHASED",
  renewable: true,
  offer_code: null,
  product_id: "locket_gold_yearly_us"
};

var locketGold = {
  grace_period_expires_date: null,
  purchase_date: "2026-01-09T10:10:14Z",
  product_identifier: "locket_gold_yearly_us",
  expires_date: "9999-12-31T23:59:59Z",
  store: "app_store",
  currency: "USD",
  price: 29.99,
  storefront: "143441",
  country_code: "US",
  is_trial_period: false,
  auto_renew: true,
  original_purchase_date: "2026-01-09T10:10:15Z"
};

// === FAKE NON-SUBSCRIPTIONS (in-app purchases) === //
obj.subscriber.non_subscriptions["locket_gold_lifetime_us"] = [{
  id: "2000001108724194",
  purchase_date: "2026-01-09T10:10:14Z",
  original_purchase_date: "2026-01-09T10:10:15Z",
  store: "app_store",
  store_transaction_id: "2000001108724194",
  is_sandbox: false,
  price: {
    "amount": 79.99,
    "currency": "USD"
  }
}];

// === APPLY SUBSCRIPTION BASED ON USER-AGENT === //
const match = Object.keys(mapping).find(e => ua.includes(e));

if (match) {
  let [e, s] = mapping[match];
  if (s) {
    locketGold.product_identifier = s;
    obj.subscriber.subscriptions[s] = anhtuaan08;
    obj.subscriber.entitlements[e] = locketGold;
  } else {
    obj.subscriber.subscriptions["locket_gold_yearly_us"] = anhtuaan08;
    obj.subscriber.entitlements[e] = locketGold;
  }
} else {
  obj.subscriber.subscriptions["locket_gold_yearly_us"] = anhtuaan08;
  obj.subscriber.entitlements.pro = locketGold;
  obj.subscriber.entitlements.gold = locketGold;
  obj.subscriber.entitlements.premium = locketGold;
}

// === FAKE DEVICE & NETWORK INFO === //
obj.device_info = {
  device_country: "US",
  store_country: "US",
  language: "en-US",
  timezone: "America/New_York",
  region: "US"
};

obj.network_info = {
  carrier: "AT&T",
  iso_country_code: "US",
  mobile_country_code: "310",
  mobile_network_code: "410"
};

// === FAKE HEADERS === //
var modifiedHeaders = {};
Object.assign(modifiedHeaders, $request.headers);

// IP và location headers
modifiedHeaders["X-Forwarded-For"] = "104.16.0.0";
modifiedHeaders["CF-IPCountry"] = "US";
modifiedHeaders["CF-Ray"] = "usa-east-1";
modifiedHeaders["X-User-Geo"] = "US";
modifiedHeaders["X-Vercel-IP-Country"] = "US";
modifiedHeaders["X-Real-IP"] = "104.16.0.1";
modifiedHeaders["X-Apple-Storefront"] = "143441";
modifiedHeaders["X-Apple-Client-Version"] = "17.0";
modifiedHeaders["X-Apple-Locale"] = "en_US";
modifiedHeaders["Accept-Language"] = "en-US,en;q=0.9";
modifiedHeaders["geo-location"] = "us";
modifiedHeaders["CloudFront-Viewer-Country"] = "US";
modifiedHeaders["X-Country-Code"] = "US";
modifiedHeaders["X-Client-Data"] = "CJa2yQEIpLbJAQjEtskBCKmdygEI0qHKAQ==";

// Store headers
modifiedHeaders["X-Storefront"] = "143441";
modifiedHeaders["X-Storefront-Id"] = "143441-1";
modifiedHeaders["X-Country"] = "US";
modifiedHeaders["X-Region"] = "US";

// Device headers
modifiedHeaders["X-Device-Country"] = "US";
modifiedHeaders["X-Device-Locale"] = "en-US";
modifiedHeaders["X-Timezone"] = "America/New_York";

// === REMOVE VIETNAMESE HEADERS === //
delete modifiedHeaders["cf-ipcountry"];
delete modifiedHeaders["x-country-code"];
delete modifiedHeaders["x-client-data"];
delete modifiedHeaders["X-VN"];
delete modifiedHeaders["X-Vietnam"];
delete modifiedHeaders["X-Location"];
delete modifiedHeaders["X-Country-Origin"];

// === ADD US COOKIES === //
if (!modifiedHeaders["Cookie"]) {
  modifiedHeaders["Cookie"] = "";
}
modifiedHeaders["Cookie"] += " storefront=143441; country=US; locale=en_US; ";

// === COMPLETE RESPONSE === //
$done({
  body: JSON.stringify(obj),
  headers: modifiedHeaders
});