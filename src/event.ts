/*
 * Copyright (c) 2018-2019 dokmic, Snowplow Analytics Ltd. All rights reserved.
 *
 * This program is licensed to you under the Apache License Version 2.0,
 * and you may not use this file except in compliance with the Apache License Version 2.0.
 * You may obtain a copy of the Apache License Version 2.0 at http://www.apache.org/licenses/LICENSE-2.0.
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the Apache License Version 2.0 is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the Apache License Version 2.0 for the specific language governing permissions and limitations there under.
 */

/**
 * Snowplow Good Event.
 */
export interface Event {
  app_id: string;
  platform: string;
  etl_tstamp: number;
  collector_tstamp: number;
  dvce_created_tstamp: number;
  event: string;
  event_id: string;
  txn_id: number;
  name_tracker: string;
  v_tracker: string;
  v_collector: string;
  v_etl: string;
  user_id: string;
  user_ipaddress: string;
  user_fingerprint: string;
  domain_userid: string;
  domain_sessionidx: number;
  network_userid: string;
  geo_country: string;
  geo_region: string;
  geo_city: string;
  geo_zipcode: string;
  geo_latitude: number;
  geo_longitude: number;
  geo_region_name: string;
  ip_isp: string;
  ip_organization: string;
  ip_domain: string;
  ip_netspeed: string;
  page_url: string;
  page_title: string;
  page_referrer: string;
  page_urlscheme: string;
  page_urlhost: string;
  page_urlport: number;
  page_urlpath: string;
  page_urlquery: string;
  page_urlfragment: string;
  refr_urlscheme: string;
  refr_urlhost: string;
  refr_urlport: number;
  refr_urlpath: string;
  refr_urlquery: string;
  refr_urlfragment: string;
  refr_medium: string;
  refr_source: string;
  refr_term: string;
  mkt_medium: string;
  mkt_source: string;
  mkt_term: string;
  mkt_content: string;
  mkt_campaign: string;
  contexts: any;
  se_category: string;
  se_action: string;
  se_label: string;
  se_property: any;
  se_value: string;
  unstruct_event: any;
  tr_orderid: string;
  tr_affiliation: string;
  tr_total: number;
  tr_tax: number;
  tr_shipping: number;
  tr_city: string;
  tr_state: string;
  tr_country: string;
  ti_orderid: string;
  ti_sku: string;
  ti_name: string;
  ti_category: string;
  ti_price: number;
  ti_quantity: number;
  pp_xoffset_min: number;
  pp_xoffset_max: number;
  pp_yoffset_min: number;
  pp_yoffset_max: number;
  useragent: string;
  br_name: string;
  br_family: string;
  br_version: string;
  br_type: string;
  br_renderengine: string;
  br_lang: string;
  br_features_pdf: boolean;
  br_features_flash: boolean;
  br_features_java: boolean;
  br_features_director: boolean;
  br_features_quicktime: boolean;
  br_features_realplayer: boolean;
  br_features_windowsmedia: boolean;
  br_features_gears: boolean;
  br_features_silverlight: boolean;
  br_cookies: boolean;
  br_colordepth: string;
  br_viewwidth: number;
  br_viewheight: number;
  os_name: string;
  os_family: string;
  os_manufacturer: string;
  os_timezone: string;
  dvce_type: string;
  dvce_ismobile: boolean;
  dvce_screenwidth: number;
  dvce_screenheight: number;
  doc_charset: string;
  doc_width: number;
  doc_height: number;
  tr_currency: string;
  tr_total_base: number;
  tr_tax_base: number;
  tr_shipping_base: number;
  ti_currency: string;
  ti_price_base: number;
  base_currency: string;
  geo_timezone: string;
  mkt_clickid: string;
  mkt_network: string;
  etl_tags: string;
  dvce_sent_tstamp: number;
  refr_domain_userid: string;
  refr_device_tstamp: number;
  derived_contexts: any;
  domain_sessionid: string;
  derived_tstamp: number;
  event_vendor: string;
  event_name: string;
  event_format: string;
  event_version: string;
  event_fingerprint: string;
  true_tstamp: number;
}
