# VTEX Catalog Api

MCP server for the VTEX Catalog Api, providing AI assistants access to VTEX e-commerce APIs.

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
npx @vtex-mcp/catalog-api
```

### Running with HTTP transport

```bash
npx @vtex-mcp/catalog-api --transport http --port 3000
```

### MCP Client Configuration (Claude Desktop)

```json
{
  "mcpServers": {
    "catalog-api": {
      "command": "npx",
      "args": ["@vtex-mcp/catalog-api"],
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

- **catalog_product_and_sku_ids** — Get product and SKU IDs
- **catalog_get_productbyid** — Get product by ID
- **catalog_put_api_catalog_pvt_product_by_product_id** — Update product
- **catalog_productand_trade_policy** — Get product and its general context
- **catalog_productby_ref_id** — Get product by reference ID
- **catalog_product_variations** — Get product's SKUs by product ID
- **catalog_get_api_addon_pvt_review_get_product_rate_by_product_id** — Get product review rate by product ID
- **catalog_post_api_catalog_pvt_product** — Create product with category and brand
- **catalog_get_product_specification** — Get product specifications by product ID
- **catalog_update_product_specification** — Update product specification by product ID
- **catalog_get_product_specificationby_product_id** — Get product specifications and their information by product ID
- **catalog_post_api_catalog_pvt_product_by_product_id_specification** — Associate product specification
- **catalog_delete_all_product_specifications** — Delete all product specifications by product ID
- **catalog_deletea_product_specification** — Delete a product specification
- **catalog_put_api_catalog_pvt_product_by_product_id_specificationvalue** — Associate product specification using specification name and group name
- **catalog_listall_skui_ds** — List all SKU IDs
- **catalog_sku_context** — Get SKU and context
- **catalog_get_api_catalog_pvt_stockkeepingunit** — Get SKU by reference ID
- **catalog_post_api_catalog_pvt_stockkeepingunit** — Create SKU
- **catalog_sku_idby_ref_id** — Get SKU ID by reference ID
- **catalog_skuby_alternate_id** — Get SKU by alternate ID
- **catalog_skulistby_product_id** — Get SKU list by product ID
- **catalog_sku_idlistby_ref_idlist** — Retrieve SKU ID list by reference ID list
- **catalog_sku** — Get SKU
- **catalog_put_api_catalog_pvt_stockkeepingunit_by_sku_id** — Update SKU
- **catalog_get_sku_complementby_skuid** — Get SKU complement by SKU ID
- **catalog_get_sku_complementsby_complement_type_id** — Get SKU complements by complement type ID
- **catalog_get_sk_ucomplementsbytype** — Get SKU complements by type
- **catalog_create_sku_complement** — Create SKU complement
- **catalog_get_sku_complementby_sku_complement_id** — Get SKU complement by SKU complement ID
- **catalog_delete_sku_complementby_sku_complement_id** — Delete SKU complement by SKU complement ID
- **catalog_skuby_ean** — Get SKU by EAN
- **catalog_get_api_catalog_pvt_stockkeepingunit_by_sku_id_ean** — Get EAN by SKU ID
- **catalog_delete_api_catalog_pvt_stockkeepingunit_by_sku_id_ean** — Delete all SKU EAN values
- **catalog_post_api_catalog_pvt_stockkeepingunit_by_sku_id_ean_by_ean** — Create SKU EAN
- **catalog_delete_api_catalog_pvt_stockkeepingunit_by_sku_id_ean_by_ean** — Delete SKU EAN
- **catalog_post_api_catalog_pvt_skuattachment** — Associate SKU attachment
- **catalog_delete_api_catalog_pvt_skuattachment** — Dissociate attachments and SKUs
- **catalog_get_api_catalog_pvt_stockkeepingunit_by_sku_id_attachment** — Get SKU attachments by SKU ID
- **catalog_delete_api_catalog_pvt_skuattachment_by_sku_attachment_association_id** — Delete SKU attachment by attachment association ID
- **catalog_associateattachmentsto_sku** — Associate attachments to an SKU
- **catalog_get_api_catalog_pvt_stockkeepingunit_by_sku_id_file** — Get SKU files
- **catalog_post_api_catalog_pvt_stockkeepingunit_by_sku_id_file** — Create SKU file
- **catalog_delete_api_catalog_pvt_stockkeepingunit_by_sku_id_file** — Delete all SKU files
- **catalog_put_api_catalog_pvt_stockkeepingunit_by_sku_id_file_by_sku_file_id** — Update SKU file
- **catalog_delete_api_catalog_pvt_stockkeepingunit_by_sku_id_file_by_sku_file_id** — Delete SKU image file
- **catalog_put_api_catalog_pvt_stockkeepingunit_by_sku_id_file_reorder** — Reorder SKU files
- **catalog_put_api_catalog_pvt_stockkeepingunit_copy_by_sku_idfrom_by_sku_idto_file** — Copy files from an SKU to another SKU
- **catalog_delete_api_catalog_pvt_stockkeepingunit_disassociate_by_sku_id_file_by_sku_file_id** — Disassociate SKU file
- **catalog_get_api_catalog_pvt_stockkeepingunitkit** — Get SKU kit by SKU ID or parent SKU ID
- **catalog_post_api_catalog_pvt_stockkeepingunitkit** — Create SKU kit
- **catalog_delete_api_catalog_pvt_stockkeepingunitkit** — Delete SKU kit by SKU ID or parent SKU ID
- **catalog_get_api_catalog_pvt_stockkeepingunitkit_by_kit_id** — Get SKU kit
- **catalog_delete_api_catalog_pvt_stockkeepingunitkit_by_kit_id** — Delete SKU kit by kit ID
- **catalog_get_sk_useller** — Get details of a seller's SKU
- **catalog_delete_sk_usellerassociation** — Remove a seller's SKU binding
- **catalog_post_api_catalog_system_pvt_skuseller_changenotification_by_seller_id_by_seller_sku_id** — Change notification with seller ID and seller SKU ID
- **catalog_change_notification** — Change notification with SKU ID
- **catalog_get_api_catalog_pvt_skuservice_by_sku_service_id** — Get SKU service
- **catalog_put_api_catalog_pvt_skuservice_by_sku_service_id** — Update SKU service
- **catalog_delete_api_catalog_pvt_skuservice_by_sku_service_id** — Dissociate SKU service
- **catalog_post_api_catalog_pvt_skuservice** — Associate SKU service
- **catalog_post_api_catalog_pvt_skuservicetypeattachment** — Associate SKU service attachment
- **catalog_delete_api_catalog_pvt_skuservicetypeattachment** — Dissociate attachment by attachment ID or SKU service type ID
- **catalog_delete_api_catalog_pvt_skuservicetypeattachment_by_sku_service_type_attachment_id** — Dissociate attachment from SKU service type
- **catalog_post_api_catalog_pvt_skuservicetype** — Create SKU service type
- **catalog_get_api_catalog_pvt_skuservicetype_by_sku_service_type_id** — Get SKU service type
- **catalog_put_api_catalog_pvt_skuservicetype_by_sku_service_type_id** — Update SKU service type
- **catalog_delete_api_catalog_pvt_skuservicetype_by_sku_service_type_id** — Delete SKU service type
- **catalog_post_api_catalog_pvt_skuservicevalue** — Create SKU service value
- **catalog_get_api_catalog_pvt_skuservicevalue_by_sku_service_value_id** — Get SKU service value
- **catalog_put_api_catalog_pvt_skuservicevalue_by_sku_service_value_id** — Update SKU service value
- **catalog_delete_api_catalog_pvt_skuservicevalue_by_sku_service_value_id** — Delete SKU service value
- **catalog_get_api_catalog_pvt_stockkeepingunit_by_sku_id_specification** — Get SKU specifications
- **catalog_post_api_catalog_pvt_stockkeepingunit_by_sku_id_specification** — Associate SKU specification
- **catalog_put_api_catalog_pvt_stockkeepingunit_by_sku_id_specification** — Update SKU specification
- **catalog_delete_api_catalog_pvt_stockkeepingunit_by_sku_id_specification** — Delete all SKU specifications
- **catalog_delete_api_catalog_pvt_stockkeepingunit_by_sku_id_specification_by_specification_id** — Delete SKU specification
- **catalog_put_api_catalog_pvt_stockkeepingunit_by_sku_id_specificationvalue** — Associate SKU specification using specification name and group name
- **catalog_post_api_catalog_pvt_subcollection_by_sub_collection_id_stockkeepingunit** — Add SKU to subcollection
- **catalog_delete_api_catalog_pvt_subcollection_by_sub_collection_id_stockkeepingunit_by_sku_id** — Delete SKU from subcollection
- **catalog_category_tree** — Get category tree
- **catalog_get_api_catalog_pvt_category_by_category_id** — Get category by ID
- **catalog_put_api_catalog_pvt_category_by_category_id** — Update category
- **catalog_post_api_catalog_pvt_category** — Create category
- **catalog_get_api_catalog_pvt_product_by_product_id_similarcategory** — Get similar categories
- **catalog_post_api_catalog_pvt_product_by_product_id_similarcategory_by_category_id** — Add similar category
- **catalog_delete_api_catalog_pvt_product_by_product_id_similarcategory_by_category_id** — Delete similar category
- **catalog_specifications_by_category_id** — Get specifications by category ID
- **catalog_specifications_tree_by_category_id** — Get specifications tree by category ID
- **catalog_post_api_catalog_pvt_subcollection_by_sub_collection_id_category** — Associate category to subcollection
- **catalog_delete_api_catalog_pvt_subcollection_by_sub_collection_id_category_by_category_id** — Delete category from subcollection
- **catalog_brand_list** — Get brand list
- **catalog_brand_list_per_page** — Get paginated brand list
- **catalog_brand** — Get brand by ID
- **catalog_post_api_catalog_pvt_brand** — Create brand
- **catalog_get_api_catalog_pvt_brand_by_brand_id** — Get brand and context
- **catalog_put_api_catalog_pvt_brand_by_brand_id** — Update brand
- **catalog_delete_api_catalog_pvt_brand_by_brand_id** — Delete brand
- **catalog_post_api_catalog_pvt_subcollection_by_sub_collection_id_brand** — Associate brand to subcollection
- **catalog_delete_api_catalog_pvt_subcollection_by_sub_collection_id_brand_by_brand_id** — Delete brand from subcollection
- **catalog_get_api_catalog_pvt_attachment_by_attachmentid** — Get attachment by ID
- **catalog_put_api_catalog_pvt_attachment_by_attachmentid** — Update attachment
- **catalog_delete_api_catalog_pvt_attachment_by_attachmentid** — Delete attachment
- **catalog_post_api_catalog_pvt_attachment** — Create attachment
- **catalog_get_api_catalog_pvt_attachments** — Get all attachments
- **catalog_get-all_inactive_collections** — Get all inactive collections
- **catalog_post-create_collection** — Create collection
- **catalog_get-importfileexample** — Import collection file example
- **catalog_post-addproductsbyimportfile** — Add products to collection by imported file
- **catalog_post-removeproductsbyimportfile** — Remove products from collection by imported file
- **catalog_get-productsfromacollection** — Get products from a collection
- **catalog_get_api_catalog_pvt_collection_by_collection_id** — Get collection by ID
- **catalog_put_api_catalog_pvt_collection_by_collection_id** — Update collection
- **catalog_delete_api_catalog_pvt_collection_by_collection_id** — Delete collection
- **catalog_get_api_catalog_pvt_collection_by_collection_id_subcollection** — Get subcollection by collection ID
- **catalog_get_api_catalog_pvt_subcollection_by_sub_collection_id** — Get subcollection by subcollection ID
- **catalog_put_api_catalog_pvt_subcollection_by_sub_collection_id** — Update subcollection
- **catalog_delete_api_catalog_pvt_subcollection_by_sub_collection_id** — Delete subcollection
- **catalog_post_api_catalog_pvt_subcollection** — Create subcollection
- **catalog_post_api_catalog_pvt_collection_by_collection_id_position** — Reposition SKU on the subcollection
- **catalog_get_api_catalog_pvt_subcollection_by_sub_collection_id_specificationvalue** — Get specification values by subcollection ID
- **catalog_post_api_catalog_pvt_subcollection_by_sub_collection_id_specificationvalue** — Use specification value in subcollection by ID
- **catalog_delete_api_catalog_pvt_subcollection_by_sub_collection_id_specificationvalue** — Delete specification value from subcollection by ID
- **catalog_get_api_catalog_pvt_specification_by_specification_id** — Get specification by specification ID
- **catalog_put_api_catalog_pvt_specification_by_specification_id** — Update specification
- **catalog_post_api_catalog_pvt_specification** — Create specification
- **catalog_specifications_field** — Get specification field
- **catalog_specifications_insert_field** — Create specification field
- **catalog_specifications_insert_field_update** — Update specification field
- **catalog_specifications_get_field_value** — Get specification field value
- **catalog_specifications_values_by_field_id** — Get specification values by specification field ID
- **catalog_specifications_insert_field_value** — Create specification field value
- **catalog_specifications_update_field_value** — Update specification field value
- **catalog_get_api_catalog_pvt_specificationvalue_by_specification_value_id** — Get specification value
- **catalog_put_api_catalog_pvt_specificationvalue_by_specification_value_id** — Update specification value
- **catalog_post_api_catalog_pvt_specificationvalue** — Create specification value
- **catalog_specifications_group_listby_category** — List specification group by category
- **catalog_specifications_group_get** — Get specification group
- **catalog_specification_group_insert2** — Create specification group
- **catalog_put_api_catalog_pvt_specificationgroup_by_group_id** — Update specification group
- **catalog_get_api_catalog_pvt_specification_nonstructured_by_id** — Get non-structured specification by ID
- **catalog_delete_api_catalog_pvt_specification_nonstructured_by_id** — Delete non-structured specification
- **catalog_get_api_catalog_pvt_specification_nonstructured** — Get non-structured specification by SKU ID
- **catalog_delete_api_catalog_pvt_specification_nonstructured** — Delete non-structured specification by SKU ID
- **catalog_sales_channel_list** — Get sales channel list
- **catalog_sales_channelby_id** — Get sales channel by ID
- **catalog_seller_list** — Get seller list
- **catalog_get_sellerby_id** — Get seller by ID
- **catalog_update_seller** — Update seller
- **catalog_create_seller** — Create seller
- **catalog_get_sellersby_id** — Get seller by ID
- **catalog_post_api_catalog_pvt_supplier** — Create supplier
- **catalog_put_api_catalog_pvt_supplier_by_supplier_id** — Update supplier
- **catalog_delete_api_catalog_pvt_supplier_by_supplier_id** — Delete supplier
- **catalog_get_api_catalog_pvt_product_by_product_id_salespolicy** — Get trade policies by product ID
- **catalog_post_api_catalog_pvt_product_by_product_id_salespolicy_by_tradepolicy_id** — Associate product with trade policy
- **catalog_delete_api_catalog_pvt_product_by_product_id_salespolicy_by_tradepolicy_id** — Remove product from trade policy
- **catalog_get_api_catalog_system_pvt_sku_stockkeepingunitidsbysaleschannel** — List all SKUs of a trade policy
- **catalog_indexed_info** — Get product indexed information
- **catalog_get_all_commercial_conditions** — Get all commercial conditions
- **catalog_get_commercial_conditions** — Get commercial condition
- **catalog_get_gift_list** — Get gift list
- **catalog_get_api_catalog_pvt_product_by_product_id_language** — Get product translation by product ID
- **catalog_put_api_catalog_pvt_product_by_product_id_language** — Create or update product translation by product ID
- **catalog_get_api_catalog_pvt_products_by_product_id_specification_by_specification_id_language** — Get product specification translation by product ID
- **catalog_put_api_catalog_pvt_products_by_product_id_specification_by_specification_id_language** — Create or update product specification translation by product ID
- **catalog_get_api_catalog_pvt_stockkeepingunit_by_sku_id_language** — Get SKU translation by SKU ID
- **catalog_put_api_catalog_pvt_stockkeepingunit_by_sku_id_language** — Create or update SKU translation by SKU ID
- **catalog_get_api_catalog_pvt_stockkeepingunit_by_sku_id_attribute_by_sku_attribute_id_language** — Get SKU attribute translation by SKU ID
- **catalog_put_api_catalog_pvt_stockkeepingunit_by_sku_id_attribute_by_sku_attribute_id_language** — Create or update SKU attribute translation by SKU ID
- **catalog_get_api_catalog_pvt_stockkeepingunit_by_sku_id_file_by_sku_file_id_language** — Get SKU file translation by SKU ID
- **catalog_put_api_catalog_pvt_stockkeepingunit_by_sku_id_file_by_sku_file_id_language** — Create or update SKU file translation by SKU ID
- **catalog_get_api_catalog_pvt_specificationgroup_by_specification_group_id_language** — Get specification group translation
- **catalog_put_api_catalog_pvt_specificationgroup_by_specification_group_id_language** — Create or update specification group translation
- **catalog_get_api_catalog_pvt_specification_by_specification_id_language** — Get specification translation
- **catalog_put_api_catalog_pvt_specification_by_specification_id_language** — Create or update specification translation
- **catalog_get_api_catalog_pvt_specificationvalue_by_value_id_language** — Get specification value translation
- **catalog_put_api_catalog_pvt_specificationvalue_by_value_id_language** — Create or update specification value translation
- **catalog_get_api_catalog_pvt_category_by_category_id_language** — Get category translation
- **catalog_put_api_catalog_pvt_category_by_category_id_language** — Create or update category translation
- **catalog_get_api_catalog_pvt_brand_by_brand_id_language** — Get brand translation
- **catalog_put_api_catalog_pvt_brand_by_brand_id_language** — Create or update brand translation
- **catalog_get_api_catalog_pvt_attachment_by_attachment_id_language** — Get attachment translation
- **catalog_put_api_catalog_pvt_attachment_by_attachment_id_language** — Create or update attachment translation
- **catalog_get_api_catalog_pvt_skuservicetype_by_sku_service_type_id_language** — Get SKU service type translation
- **catalog_put_api_catalog_pvt_skuservicetype_by_sku_service_type_id_language** — Create or update SKU service type translation
- **catalog_get_api_catalog_pvt_skuservice_by_skuservice_id_language** — Get SKU service translation
- **catalog_put_api_catalog_pvt_skuservice_by_skuservice_id_language** — Create or update SKU service translation
- **catalog_get_api_catalog_pvt_skuservicevalue_by_sku_service_value_id_language** — Get SKU service value translation
- **catalog_put_api_catalog_pvt_skuservicevalue_by_sku_service_value_id_language** — Create or update SKU service value translation
- **catalog_get_api_catalog_pvt_collection_by_collection_id_language** — Get collection translation
- **catalog_put_api_catalog_pvt_collection_by_collection_id_language** — Create or update collection translation
