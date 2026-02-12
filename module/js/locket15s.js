// ========= ID ========= //
const mapping = {
  '%E8%BD%A6%E7%A5%A8%E7%A5%A8': ['vip+watch_vip'],
  'Locket': ['Gold']
};
// =========   Phần cố định  ========= // 
// =========  @anhtuaan.08 ========= // 
var ua = $request.headers["User-Agent"] || $request.headers["user-agent"],
  obj = JSON.parse($response.body);

obj.Attention = "Chúc mừng bạn! Vui lòng không bán hoặc chia sẻ cho người khác!";

// Thêm location data để fake ở Mỹ
if (!obj.subscriber.entitlements) obj.subscriber.entitlements = {};
if (!obj.subscriber.other_purchases) obj.subscriber.other_purchases = {};

// Fake location data
obj.subscriber.other_purchases["location"] = {
  "country_code": "US",
  "storefront": "USA",
  "region": "Americas",
  "timezone": "America/New_York",
  "ip_country": "United States",
  "store_country": "USA",
  "locale": "en_US"
};

// Thêm vào response headers để fake IP Mỹ
var modifiedHeaders = $request.headers;
modifiedHeaders["X-Forwarded-For"] = "8.8.8.8"; // Google DNS IP ở Mỹ
modifiedHeaders["CF-IPCountry"] = "US";
modifiedHeaders["X-User-Geo"] = "US";
modifiedHeaders["X-Vercel-IP-Country"] = "US";
modifiedHeaders["X-Real-IP"] = "8.8.8.8";

var anhtuaan08 = {
      auto_resume_date: null,
      display_name: "locket_1600_1y",
      is_sandbox: true,
      ownership_type: "PURCHASED",
      billing_issues_detected_at: null,
      management_url: "https://apps.apple.com/account/subscriptions",
      period_type: "normal",
      price: {
          "amount": 39.99, // Giá USD
          "currency": "USD" // Đổi sang USD
      },
      expires_date: "9999-01-09T10:10:14Z",
      grace_period_expires_date: null,
      refunded_at: null,
      unsubscribe_detected_at: null,
      original_purchase_date: "2026-01-09T10:10:15Z",
      purchase_date: "2026-01-09T10:10:14Z",
      store: "app_store",
      store_transaction_id: "2000001108724193",
  },
  locketGold = {
      grace_period_expires_date: null,
      purchase_date: "2026-01-09T10:10:14Z",
      product_identifier: "locket_1600_1y",
      expires_date: "9999-01-09T10:10:14Z",
      store: "us" // Thêm store region
  };

const match = Object.keys(mapping).find(e => ua.includes(e));
if (match) {
  let [e, s] = mapping[match];
  s ? (locketGold.product_identifier = s, obj.subscriber.subscriptions[s] = anhtuaan08) : obj.subscriber.subscriptions["locket_1600_1y"] = anhtuaan08, obj.subscriber.entitlements[e] = locketGold
} else {
  obj.subscriber.subscriptions["locket_1600_1y"] = anhtuaan08, 
  obj.subscriber.entitlements.pro = locketGold;
}

$done({
  body: JSON.stringify(obj),
  headers: modifiedHeaders // Gửi headers đã sửa
});