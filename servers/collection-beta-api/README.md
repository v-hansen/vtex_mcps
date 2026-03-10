# VTEX Collection Beta Api

MCP server for the VTEX Collection Beta Api, providing AI assistants access to VTEX e-commerce APIs.

## Setup

### Environment Variables

| Variable | Required | Description |
|---|---|---|
| `VTEX_ACCOUNT_NAME` | Yes | Your VTEX account name |
| `VTEX_APP_KEY` | Yes* | VTEX app key for authentication |
| `VTEX_APP_TOKEN` | Yes* | VTEX app token for authentication |
| `VTEX_AUTH_TOKEN` | No | Alternative auth token (replaces app key/token) |
| `VTEX_ENVIRONMENT` | No | VTEX environment (default: `vtexcommercestable`) |

\* Required unless `VTEX_AUTH_TOKEN` is provided.

### Running via npx

```bash
npx @vtex-mcp/collection-beta-api
```

### Running with HTTP transport

```bash
npx @vtex-mcp/collection-beta-api --transport http --port 3000
```

### MCP Client Configuration (Claude Desktop)

```json
{
  "mcpServers": {
    "collection-beta-api": {
      "command": "npx",
      "args": ["@vtex-mcp/collection-beta-api"],
      "env": {
        "VTEX_ACCOUNT_NAME": "your-account",
        "VTEX_APP_KEY": "your-app-key",
        "VTEX_APP_TOKEN": "your-app-token"
      }
    }
  }
}
```

## Available Tools

This server exposes 193 tool(s):

- **collection-beta_product_and_sku_ids** — Get product and SKU IDs
- **collection-beta_get_productbyid** — Get product by ID
- **collection-beta_put_api_catalog_pvt_product_by_product_id** — Update product
- **collection-beta_productand_trade_policy** — Get product and its general context
- **collection-beta_productby_ref_id** — Get product by reference ID
- **collection-beta_product_variations** — Get product's SKUs by product ID
- **collection-beta_get_api_addon_pvt_review_get_product_rate_by_product_id** — Get product review rate by product ID
- **collection-beta_post_api_catalog_pvt_product** — Create product with category and brand
- **collection-beta_get_product_specification** — Get product specifications by product ID
- **collection-beta_update_product_specification** — Update product specification by product ID
- **collection-beta_get_product_specificationby_product_id** — Get product specifications and their information by product ID
- **collection-beta_post_api_catalog_pvt_product_by_product_id_specification** — Associate product specification
- **collection-beta_delete_all_product_specifications** — Delete all product specifications by product ID
- **collection-beta_deletea_product_specification** — Delete a product specification
- **collection-beta_put_api_catalog_pvt_product_by_product_id_specificationvalue** — Associate product specification using specification name and group name
- **collection-beta_listall_skui_ds** — List all SKU IDs
- **collection-beta_sku_context** — Get SKU and context
- **collection-beta_get_api_catalog_pvt_stockkeepingunit** — Get SKU by reference ID
- **collection-beta_post_api_catalog_pvt_stockkeepingunit** — Create SKU
- **collection-beta_sku_idby_ref_id** — Get SKU ID by reference ID
- **collection-beta_skuby_alternate_id** — Get SKU by alternate ID
- **collection-beta_skulistby_product_id** — Get SKU list by product ID
- **collection-beta_sku_idlistby_ref_idlist** — Retrieve SKU ID list by reference ID list
- **collection-beta_sku** — Get SKU
- **collection-beta_put_api_catalog_pvt_stockkeepingunit_by_sku_id** — Update SKU
- **collection-beta_get_sku_complementby_skuid** — Get SKU complement by SKU ID
- **collection-beta_get_sku_complementsby_complement_type_id** — Get SKU complements by complement type ID
- **collection-beta_get_sk_ucomplementsbytype** — Get SKU complements by type
- **collection-beta_create_sku_complement** — Create SKU complement
- **collection-beta_get_sku_complementby_sku_complement_id** — Get SKU complement by SKU complement ID
- **collection-beta_delete_sku_complementby_sku_complement_id** — Delete SKU complement by SKU complement ID
- **collection-beta_skuby_ean** — Get SKU by EAN
- **collection-beta_get_api_catalog_pvt_stockkeepingunit_by_sku_id_ean** — Get EAN by SKU ID
- **collection-beta_delete_api_catalog_pvt_stockkeepingunit_by_sku_id_ean** — Delete all SKU EAN values
- **collection-beta_post_api_catalog_pvt_stockkeepingunit_by_sku_id_ean_by_ean** — Create SKU EAN
- **collection-beta_delete_api_catalog_pvt_stockkeepingunit_by_sku_id_ean_by_ean** — Delete SKU EAN
- **collection-beta_post_api_catalog_pvt_skuattachment** — Associate SKU attachment
- **collection-beta_delete_api_catalog_pvt_skuattachment** — Dissociate attachments and SKUs
- **collection-beta_get_api_catalog_pvt_stockkeepingunit_by_sku_id_attachment** — Get SKU attachments by SKU ID
- **collection-beta_delete_api_catalog_pvt_skuattachment_by_sku_attachment_association_id** — Delete SKU attachment by attachment association ID
- **collection-beta_associateattachmentsto_sku** — Associate attachments to an SKU
- **collection-beta_get_api_catalog_pvt_stockkeepingunit_by_sku_id_file** — Get SKU files
- **collection-beta_post_api_catalog_pvt_stockkeepingunit_by_sku_id_file** — Create SKU file
- **collection-beta_delete_api_catalog_pvt_stockkeepingunit_by_sku_id_file** — Delete all SKU files
- **collection-beta_put_api_catalog_pvt_stockkeepingunit_by_sku_id_file_by_sku_file_id** — Update SKU file
- **collection-beta_delete_api_catalog_pvt_stockkeepingunit_by_sku_id_file_by_sku_file_id** — Delete SKU image file
- **collection-beta_put_api_catalog_pvt_stockkeepingunit_by_sku_id_file_reorder** — Reorder SKU files
- **collection-beta_put_api_catalog_pvt_stockkeepingunit_copy_by_sku_idfrom_by_sku_idto_file** — Copy files from an SKU to another SKU
- **collection-beta_delete_api_catalog_pvt_stockkeepingunit_disassociate_by_sku_id_file_by_sku_file_id** — Disassociate SKU file
- **collection-beta_get_api_catalog_pvt_stockkeepingunitkit** — Get SKU kit by SKU ID or parent SKU ID
- **collection-beta_post_api_catalog_pvt_stockkeepingunitkit** — Create SKU kit
- **collection-beta_delete_api_catalog_pvt_stockkeepingunitkit** — Delete SKU kit by SKU ID or parent SKU ID
- **collection-beta_get_api_catalog_pvt_stockkeepingunitkit_by_kit_id** — Get SKU kit
- **collection-beta_delete_api_catalog_pvt_stockkeepingunitkit_by_kit_id** — Delete SKU kit by kit ID
- **collection-beta_get_sk_useller** — Get details of a seller's SKU
- **collection-beta_delete_sk_usellerassociation** — Remove a seller's SKU binding
- **collection-beta_post_api_catalog_system_pvt_skuseller_changenotification_by_seller_id_by_seller_sku_id** — Change notification with seller ID and seller SKU ID
- **collection-beta_change_notification** — Change notification with SKU ID
- **collection-beta_get_api_catalog_pvt_skuservice_by_sku_service_id** — Get SKU service
- **collection-beta_put_api_catalog_pvt_skuservice_by_sku_service_id** — Update SKU service
- **collection-beta_delete_api_catalog_pvt_skuservice_by_sku_service_id** — Dissociate SKU service
- **collection-beta_post_api_catalog_pvt_skuservice** — Associate SKU service
- **collection-beta_post_api_catalog_pvt_skuservicetypeattachment** — Associate SKU service attachment
- **collection-beta_delete_api_catalog_pvt_skuservicetypeattachment** — Dissociate attachment by attachment ID or SKU service type ID
- **collection-beta_delete_api_catalog_pvt_skuservicetypeattachment_by_sku_service_type_attachment_id** — Dissociate attachment from SKU service type
- **collection-beta_post_api_catalog_pvt_skuservicetype** — Create SKU service type
- **collection-beta_get_api_catalog_pvt_skuservicetype_by_sku_service_type_id** — Get SKU service type
- **collection-beta_put_api_catalog_pvt_skuservicetype_by_sku_service_type_id** — Update SKU service type
- **collection-beta_delete_api_catalog_pvt_skuservicetype_by_sku_service_type_id** — Delete SKU service type
- **collection-beta_post_api_catalog_pvt_skuservicevalue** — Create SKU service value
- **collection-beta_get_api_catalog_pvt_skuservicevalue_by_sku_service_value_id** — Get SKU service value
- **collection-beta_put_api_catalog_pvt_skuservicevalue_by_sku_service_value_id** — Update SKU service value
- **collection-beta_delete_api_catalog_pvt_skuservicevalue_by_sku_service_value_id** — Delete SKU service value
- **collection-beta_get_api_catalog_pvt_stockkeepingunit_by_sku_id_specification** — Get SKU specifications
- **collection-beta_post_api_catalog_pvt_stockkeepingunit_by_sku_id_specification** — Associate SKU specification
- **collection-beta_put_api_catalog_pvt_stockkeepingunit_by_sku_id_specification** — Update SKU specification
- **collection-beta_delete_api_catalog_pvt_stockkeepingunit_by_sku_id_specification** — Delete all SKU specifications
- **collection-beta_delete_api_catalog_pvt_stockkeepingunit_by_sku_id_specification_by_specification_id** — Delete SKU specification
- **collection-beta_put_api_catalog_pvt_stockkeepingunit_by_sku_id_specificationvalue** — Associate SKU specification using specification name and group name
- **collection-beta_post_api_catalog_pvt_subcollection_by_sub_collection_id_stockkeepingunit** — Add SKU to subcollection
- **collection-beta_delete_api_catalog_pvt_subcollection_by_sub_collection_id_stockkeepingunit_by_sku_id** — Delete SKU from subcollection
- **collection-beta_category_tree** — Get category tree
- **collection-beta_get_api_catalog_pvt_category_by_category_id** — Get category by ID
- **collection-beta_put_api_catalog_pvt_category_by_category_id** — Update category
- **collection-beta_post_api_catalog_pvt_category** — Create category
- **collection-beta_get_api_catalog_pvt_product_by_product_id_similarcategory** — Get similar categories
- **collection-beta_post_api_catalog_pvt_product_by_product_id_similarcategory_by_category_id** — Add similar category
- **collection-beta_delete_api_catalog_pvt_product_by_product_id_similarcategory_by_category_id** — Delete similar category
- **collection-beta_specifications_by_category_id** — Get specifications by category ID
- **collection-beta_specifications_tree_by_category_id** — Get specifications tree by category ID
- **collection-beta_post_api_catalog_pvt_subcollection_by_sub_collection_id_category** — Associate category to subcollection
- **collection-beta_delete_api_catalog_pvt_subcollection_by_sub_collection_id_category_by_category_id** — Delete category from subcollection
- **collection-beta_brand_list** — Get brand list
- **collection-beta_brand_list_per_page** — Get paginated brand list
- **collection-beta_brand** — Get brand by ID
- **collection-beta_post_api_catalog_pvt_brand** — Create brand
- **collection-beta_get_api_catalog_pvt_brand_by_brand_id** — Get brand and context
- **collection-beta_put_api_catalog_pvt_brand_by_brand_id** — Update brand
- **collection-beta_delete_api_catalog_pvt_brand_by_brand_id** — Delete brand
- **collection-beta_post_api_catalog_pvt_subcollection_by_sub_collection_id_brand** — Associate brand to subcollection
- **collection-beta_delete_api_catalog_pvt_subcollection_by_sub_collection_id_brand_by_brand_id** — Delete brand from subcollection
- **collection-beta_get_api_catalog_pvt_attachment_by_attachmentid** — Get attachment by ID
- **collection-beta_put_api_catalog_pvt_attachment_by_attachmentid** — Update attachment
- **collection-beta_delete_api_catalog_pvt_attachment_by_attachmentid** — Delete attachment
- **collection-beta_post_api_catalog_pvt_attachment** — Create attachment
- **collection-beta_get_api_catalog_pvt_attachments** — Get all attachments
- **collection-beta_get-all_inactive_collections** — Get all inactive collections
- **collection-beta_post-create_collection** — Create collection
- **collection-beta_get-importfileexample** — Import collection file example
- **collection-beta_post-addproductsbyimportfile** — Add products to collection by imported file
- **collection-beta_post-removeproductsbyimportfile** — Remove products from collection by imported file
- **collection-beta_get-productsfromacollection** — Get products from a collection
- **collection-beta_get_api_catalog_pvt_collection_by_collection_id** — Get collection by ID
- **collection-beta_put_api_catalog_pvt_collection_by_collection_id** — Update collection
- **collection-beta_delete_api_catalog_pvt_collection_by_collection_id** — Delete collection
- **collection-beta_get_api_catalog_pvt_collection_by_collection_id_subcollection** — Get subcollection by collection ID
- **collection-beta_get_api_catalog_pvt_subcollection_by_sub_collection_id** — Get subcollection by subcollection ID
- **collection-beta_put_api_catalog_pvt_subcollection_by_sub_collection_id** — Update subcollection
- **collection-beta_delete_api_catalog_pvt_subcollection_by_sub_collection_id** — Delete subcollection
- **collection-beta_post_api_catalog_pvt_subcollection** — Create subcollection
- **collection-beta_post_api_catalog_pvt_collection_by_collection_id_position** — Reposition SKU on the subcollection
- **collection-beta_get_api_catalog_pvt_subcollection_by_sub_collection_id_specificationvalue** — Get specification values by subcollection ID
- **collection-beta_post_api_catalog_pvt_subcollection_by_sub_collection_id_specificationvalue** — Use specification value in subcollection by ID
- **collection-beta_delete_api_catalog_pvt_subcollection_by_sub_collection_id_specificationvalue** — Delete specification value from subcollection by ID
- **collection-beta_get_api_catalog_pvt_specification_by_specification_id** — Get specification by specification ID
- **collection-beta_put_api_catalog_pvt_specification_by_specification_id** — Update specification
- **collection-beta_post_api_catalog_pvt_specification** — Create specification
- **collection-beta_specifications_field** — Get specification field
- **collection-beta_specifications_insert_field** — Create specification field
- **collection-beta_specifications_insert_field_update** — Update specification field
- **collection-beta_specifications_get_field_value** — Get specification field value
- **collection-beta_specifications_values_by_field_id** — Get specification values by specification field ID
- **collection-beta_specifications_insert_field_value** — Create specification field value
- **collection-beta_specifications_update_field_value** — Update specification field value
- **collection-beta_get_api_catalog_pvt_specificationvalue_by_specification_value_id** — Get specification value
- **collection-beta_put_api_catalog_pvt_specificationvalue_by_specification_value_id** — Update specification value
- **collection-beta_post_api_catalog_pvt_specificationvalue** — Create specification value
- **collection-beta_specifications_group_listby_category** — List specification group by category
- **collection-beta_specifications_group_get** — Get specification group
- **collection-beta_specification_group_insert2** — Create specification group
- **collection-beta_put_api_catalog_pvt_specificationgroup_by_group_id** — Update specification group
- **collection-beta_get_api_catalog_pvt_specification_nonstructured_by_id** — Get non-structured specification by ID
- **collection-beta_delete_api_catalog_pvt_specification_nonstructured_by_id** — Delete non-structured specification
- **collection-beta_get_api_catalog_pvt_specification_nonstructured** — Get non-structured specification by SKU ID
- **collection-beta_delete_api_catalog_pvt_specification_nonstructured** — Delete non-structured specification by SKU ID
- **collection-beta_sales_channel_list** — Get sales channel list
- **collection-beta_sales_channelby_id** — Get sales channel by ID
- **collection-beta_seller_list** — Get seller list
- **collection-beta_get_sellerby_id** — Get seller by ID
- **collection-beta_update_seller** — Update seller
- **collection-beta_create_seller** — Create seller
- **collection-beta_get_sellersby_id** — Get seller by ID
- **collection-beta_post_api_catalog_pvt_supplier** — Create supplier
- **collection-beta_put_api_catalog_pvt_supplier_by_supplier_id** — Update supplier
- **collection-beta_delete_api_catalog_pvt_supplier_by_supplier_id** — Delete supplier
- **collection-beta_get_api_catalog_pvt_product_by_product_id_salespolicy** — Get trade policies by product ID
- **collection-beta_post_api_catalog_pvt_product_by_product_id_salespolicy_by_tradepolicy_id** — Associate product with trade policy
- **collection-beta_delete_api_catalog_pvt_product_by_product_id_salespolicy_by_tradepolicy_id** — Remove product from trade policy
- **collection-beta_get_api_catalog_system_pvt_sku_stockkeepingunitidsbysaleschannel** — List all SKUs of a trade policy
- **collection-beta_indexed_info** — Get product indexed information
- **collection-beta_get_all_commercial_conditions** — Get all commercial conditions
- **collection-beta_get_commercial_conditions** — Get commercial condition
- **collection-beta_get_gift_list** — Get gift list
- **collection-beta_get_api_catalog_pvt_product_by_product_id_language** — Get product translation by product ID
- **collection-beta_put_api_catalog_pvt_product_by_product_id_language** — Create or update product translation by product ID
- **collection-beta_get_api_catalog_pvt_products_by_product_id_specification_by_specification_id_language** — Get product specification translation by product ID
- **collection-beta_put_api_catalog_pvt_products_by_product_id_specification_by_specification_id_language** — Create or update product specification translation by product ID
- **collection-beta_get_api_catalog_pvt_stockkeepingunit_by_sku_id_language** — Get SKU translation by SKU ID
- **collection-beta_put_api_catalog_pvt_stockkeepingunit_by_sku_id_language** — Create or update SKU translation by SKU ID
- **collection-beta_get_api_catalog_pvt_stockkeepingunit_by_sku_id_attribute_by_sku_attribute_id_language** — Get SKU attribute translation by SKU ID
- **collection-beta_put_api_catalog_pvt_stockkeepingunit_by_sku_id_attribute_by_sku_attribute_id_language** — Create or update SKU attribute translation by SKU ID
- **collection-beta_get_api_catalog_pvt_stockkeepingunit_by_sku_id_file_by_sku_file_id_language** — Get SKU file translation by SKU ID
- **collection-beta_put_api_catalog_pvt_stockkeepingunit_by_sku_id_file_by_sku_file_id_language** — Create or update SKU file translation by SKU ID
- **collection-beta_get_api_catalog_pvt_specificationgroup_by_specification_group_id_language** — Get specification group translation
- **collection-beta_put_api_catalog_pvt_specificationgroup_by_specification_group_id_language** — Create or update specification group translation
- **collection-beta_get_api_catalog_pvt_specification_by_specification_id_language** — Get specification translation
- **collection-beta_put_api_catalog_pvt_specification_by_specification_id_language** — Create or update specification translation
- **collection-beta_get_api_catalog_pvt_specificationvalue_by_value_id_language** — Get specification value translation
- **collection-beta_put_api_catalog_pvt_specificationvalue_by_value_id_language** — Create or update specification value translation
- **collection-beta_get_api_catalog_pvt_category_by_category_id_language** — Get category translation
- **collection-beta_put_api_catalog_pvt_category_by_category_id_language** — Create or update category translation
- **collection-beta_get_api_catalog_pvt_brand_by_brand_id_language** — Get brand translation
- **collection-beta_put_api_catalog_pvt_brand_by_brand_id_language** — Create or update brand translation
- **collection-beta_get_api_catalog_pvt_attachment_by_attachment_id_language** — Get attachment translation
- **collection-beta_put_api_catalog_pvt_attachment_by_attachment_id_language** — Create or update attachment translation
- **collection-beta_get_api_catalog_pvt_skuservicetype_by_sku_service_type_id_language** — Get SKU service type translation
- **collection-beta_put_api_catalog_pvt_skuservicetype_by_sku_service_type_id_language** — Create or update SKU service type translation
- **collection-beta_get_api_catalog_pvt_skuservice_by_skuservice_id_language** — Get SKU service translation
- **collection-beta_put_api_catalog_pvt_skuservice_by_skuservice_id_language** — Create or update SKU service translation
- **collection-beta_get_api_catalog_pvt_skuservicevalue_by_sku_service_value_id_language** — Get SKU service value translation
- **collection-beta_put_api_catalog_pvt_skuservicevalue_by_sku_service_value_id_language** — Create or update SKU service value translation
- **collection-beta_get_api_catalog_pvt_collection_by_collection_id_language** — Get collection translation
- **collection-beta_put_api_catalog_pvt_collection_by_collection_id_language** — Create or update collection translation
