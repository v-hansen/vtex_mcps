# VTEX Brand Api

MCP server for the VTEX Brand Api, providing AI assistants access to VTEX e-commerce APIs.

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
npx @vtex-mcp/brand-api
```

### Running with HTTP transport

```bash
npx @vtex-mcp/brand-api --transport http --port 3000
```

### MCP Client Configuration (Claude Desktop)

```json
{
  "mcpServers": {
    "brand-api": {
      "command": "npx",
      "args": ["@vtex-mcp/brand-api"],
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

- **brand_product_and_sku_ids** — Get product and SKU IDs
- **brand_get_productbyid** — Get product by ID
- **brand_put_api_catalog_pvt_product_by_product_id** — Update product
- **brand_productand_trade_policy** — Get product and its general context
- **brand_productby_ref_id** — Get product by reference ID
- **brand_product_variations** — Get product's SKUs by product ID
- **brand_get_api_addon_pvt_review_get_product_rate_by_product_id** — Get product review rate by product ID
- **brand_post_api_catalog_pvt_product** — Create product with category and brand
- **brand_get_product_specification** — Get product specifications by product ID
- **brand_update_product_specification** — Update product specification by product ID
- **brand_get_product_specificationby_product_id** — Get product specifications and their information by product ID
- **brand_post_api_catalog_pvt_product_by_product_id_specification** — Associate product specification
- **brand_delete_all_product_specifications** — Delete all product specifications by product ID
- **brand_deletea_product_specification** — Delete a product specification
- **brand_put_api_catalog_pvt_product_by_product_id_specificationvalue** — Associate product specification using specification name and group name
- **brand_listall_skui_ds** — List all SKU IDs
- **brand_sku_context** — Get SKU and context
- **brand_get_api_catalog_pvt_stockkeepingunit** — Get SKU by reference ID
- **brand_post_api_catalog_pvt_stockkeepingunit** — Create SKU
- **brand_sku_idby_ref_id** — Get SKU ID by reference ID
- **brand_skuby_alternate_id** — Get SKU by alternate ID
- **brand_skulistby_product_id** — Get SKU list by product ID
- **brand_sku_idlistby_ref_idlist** — Retrieve SKU ID list by reference ID list
- **brand_sku** — Get SKU
- **brand_put_api_catalog_pvt_stockkeepingunit_by_sku_id** — Update SKU
- **brand_get_sku_complementby_skuid** — Get SKU complement by SKU ID
- **brand_get_sku_complementsby_complement_type_id** — Get SKU complements by complement type ID
- **brand_get_sk_ucomplementsbytype** — Get SKU complements by type
- **brand_create_sku_complement** — Create SKU complement
- **brand_get_sku_complementby_sku_complement_id** — Get SKU complement by SKU complement ID
- **brand_delete_sku_complementby_sku_complement_id** — Delete SKU complement by SKU complement ID
- **brand_skuby_ean** — Get SKU by EAN
- **brand_get_api_catalog_pvt_stockkeepingunit_by_sku_id_ean** — Get EAN by SKU ID
- **brand_delete_api_catalog_pvt_stockkeepingunit_by_sku_id_ean** — Delete all SKU EAN values
- **brand_post_api_catalog_pvt_stockkeepingunit_by_sku_id_ean_by_ean** — Create SKU EAN
- **brand_delete_api_catalog_pvt_stockkeepingunit_by_sku_id_ean_by_ean** — Delete SKU EAN
- **brand_post_api_catalog_pvt_skuattachment** — Associate SKU attachment
- **brand_delete_api_catalog_pvt_skuattachment** — Dissociate attachments and SKUs
- **brand_get_api_catalog_pvt_stockkeepingunit_by_sku_id_attachment** — Get SKU attachments by SKU ID
- **brand_delete_api_catalog_pvt_skuattachment_by_sku_attachment_association_id** — Delete SKU attachment by attachment association ID
- **brand_associateattachmentsto_sku** — Associate attachments to an SKU
- **brand_get_api_catalog_pvt_stockkeepingunit_by_sku_id_file** — Get SKU files
- **brand_post_api_catalog_pvt_stockkeepingunit_by_sku_id_file** — Create SKU file
- **brand_delete_api_catalog_pvt_stockkeepingunit_by_sku_id_file** — Delete all SKU files
- **brand_put_api_catalog_pvt_stockkeepingunit_by_sku_id_file_by_sku_file_id** — Update SKU file
- **brand_delete_api_catalog_pvt_stockkeepingunit_by_sku_id_file_by_sku_file_id** — Delete SKU image file
- **brand_put_api_catalog_pvt_stockkeepingunit_by_sku_id_file_reorder** — Reorder SKU files
- **brand_put_api_catalog_pvt_stockkeepingunit_copy_by_sku_idfrom_by_sku_idto_file** — Copy files from an SKU to another SKU
- **brand_delete_api_catalog_pvt_stockkeepingunit_disassociate_by_sku_id_file_by_sku_file_id** — Disassociate SKU file
- **brand_get_api_catalog_pvt_stockkeepingunitkit** — Get SKU kit by SKU ID or parent SKU ID
- **brand_post_api_catalog_pvt_stockkeepingunitkit** — Create SKU kit
- **brand_delete_api_catalog_pvt_stockkeepingunitkit** — Delete SKU kit by SKU ID or parent SKU ID
- **brand_get_api_catalog_pvt_stockkeepingunitkit_by_kit_id** — Get SKU kit
- **brand_delete_api_catalog_pvt_stockkeepingunitkit_by_kit_id** — Delete SKU kit by kit ID
- **brand_get_sk_useller** — Get details of a seller's SKU
- **brand_delete_sk_usellerassociation** — Remove a seller's SKU binding
- **brand_post_api_catalog_system_pvt_skuseller_changenotification_by_seller_id_by_seller_sku_id** — Change notification with seller ID and seller SKU ID
- **brand_change_notification** — Change notification with SKU ID
- **brand_get_api_catalog_pvt_skuservice_by_sku_service_id** — Get SKU service
- **brand_put_api_catalog_pvt_skuservice_by_sku_service_id** — Update SKU service
- **brand_delete_api_catalog_pvt_skuservice_by_sku_service_id** — Dissociate SKU service
- **brand_post_api_catalog_pvt_skuservice** — Associate SKU service
- **brand_post_api_catalog_pvt_skuservicetypeattachment** — Associate SKU service attachment
- **brand_delete_api_catalog_pvt_skuservicetypeattachment** — Dissociate attachment by attachment ID or SKU service type ID
- **brand_delete_api_catalog_pvt_skuservicetypeattachment_by_sku_service_type_attachment_id** — Dissociate attachment from SKU service type
- **brand_post_api_catalog_pvt_skuservicetype** — Create SKU service type
- **brand_get_api_catalog_pvt_skuservicetype_by_sku_service_type_id** — Get SKU service type
- **brand_put_api_catalog_pvt_skuservicetype_by_sku_service_type_id** — Update SKU service type
- **brand_delete_api_catalog_pvt_skuservicetype_by_sku_service_type_id** — Delete SKU service type
- **brand_post_api_catalog_pvt_skuservicevalue** — Create SKU service value
- **brand_get_api_catalog_pvt_skuservicevalue_by_sku_service_value_id** — Get SKU service value
- **brand_put_api_catalog_pvt_skuservicevalue_by_sku_service_value_id** — Update SKU service value
- **brand_delete_api_catalog_pvt_skuservicevalue_by_sku_service_value_id** — Delete SKU service value
- **brand_get_api_catalog_pvt_stockkeepingunit_by_sku_id_specification** — Get SKU specifications
- **brand_post_api_catalog_pvt_stockkeepingunit_by_sku_id_specification** — Associate SKU specification
- **brand_put_api_catalog_pvt_stockkeepingunit_by_sku_id_specification** — Update SKU specification
- **brand_delete_api_catalog_pvt_stockkeepingunit_by_sku_id_specification** — Delete all SKU specifications
- **brand_delete_api_catalog_pvt_stockkeepingunit_by_sku_id_specification_by_specification_id** — Delete SKU specification
- **brand_put_api_catalog_pvt_stockkeepingunit_by_sku_id_specificationvalue** — Associate SKU specification using specification name and group name
- **brand_post_api_catalog_pvt_subcollection_by_sub_collection_id_stockkeepingunit** — Add SKU to subcollection
- **brand_delete_api_catalog_pvt_subcollection_by_sub_collection_id_stockkeepingunit_by_sku_id** — Delete SKU from subcollection
- **brand_category_tree** — Get category tree
- **brand_get_api_catalog_pvt_category_by_category_id** — Get category by ID
- **brand_put_api_catalog_pvt_category_by_category_id** — Update category
- **brand_post_api_catalog_pvt_category** — Create category
- **brand_get_api_catalog_pvt_product_by_product_id_similarcategory** — Get similar categories
- **brand_post_api_catalog_pvt_product_by_product_id_similarcategory_by_category_id** — Add similar category
- **brand_delete_api_catalog_pvt_product_by_product_id_similarcategory_by_category_id** — Delete similar category
- **brand_specifications_by_category_id** — Get specifications by category ID
- **brand_specifications_tree_by_category_id** — Get specifications tree by category ID
- **brand_post_api_catalog_pvt_subcollection_by_sub_collection_id_category** — Associate category to subcollection
- **brand_delete_api_catalog_pvt_subcollection_by_sub_collection_id_category_by_category_id** — Delete category from subcollection
- **brand_brand_list** — Get brand list
- **brand_brand_list_per_page** — Get paginated brand list
- **brand_brand** — Get brand by ID
- **brand_post_api_catalog_pvt_brand** — Create brand
- **brand_get_api_catalog_pvt_brand_by_brand_id** — Get brand and context
- **brand_put_api_catalog_pvt_brand_by_brand_id** — Update brand
- **brand_delete_api_catalog_pvt_brand_by_brand_id** — Delete brand
- **brand_post_api_catalog_pvt_subcollection_by_sub_collection_id_brand** — Associate brand to subcollection
- **brand_delete_api_catalog_pvt_subcollection_by_sub_collection_id_brand_by_brand_id** — Delete brand from subcollection
- **brand_get_api_catalog_pvt_attachment_by_attachmentid** — Get attachment by ID
- **brand_put_api_catalog_pvt_attachment_by_attachmentid** — Update attachment
- **brand_delete_api_catalog_pvt_attachment_by_attachmentid** — Delete attachment
- **brand_post_api_catalog_pvt_attachment** — Create attachment
- **brand_get_api_catalog_pvt_attachments** — Get all attachments
- **brand_get-all_inactive_collections** — Get all inactive collections
- **brand_post-create_collection** — Create collection
- **brand_get-importfileexample** — Import collection file example
- **brand_post-addproductsbyimportfile** — Add products to collection by imported file
- **brand_post-removeproductsbyimportfile** — Remove products from collection by imported file
- **brand_get-productsfromacollection** — Get products from a collection
- **brand_get_api_catalog_pvt_collection_by_collection_id** — Get collection by ID
- **brand_put_api_catalog_pvt_collection_by_collection_id** — Update collection
- **brand_delete_api_catalog_pvt_collection_by_collection_id** — Delete collection
- **brand_get_api_catalog_pvt_collection_by_collection_id_subcollection** — Get subcollection by collection ID
- **brand_get_api_catalog_pvt_subcollection_by_sub_collection_id** — Get subcollection by subcollection ID
- **brand_put_api_catalog_pvt_subcollection_by_sub_collection_id** — Update subcollection
- **brand_delete_api_catalog_pvt_subcollection_by_sub_collection_id** — Delete subcollection
- **brand_post_api_catalog_pvt_subcollection** — Create subcollection
- **brand_post_api_catalog_pvt_collection_by_collection_id_position** — Reposition SKU on the subcollection
- **brand_get_api_catalog_pvt_subcollection_by_sub_collection_id_specificationvalue** — Get specification values by subcollection ID
- **brand_post_api_catalog_pvt_subcollection_by_sub_collection_id_specificationvalue** — Use specification value in subcollection by ID
- **brand_delete_api_catalog_pvt_subcollection_by_sub_collection_id_specificationvalue** — Delete specification value from subcollection by ID
- **brand_get_api_catalog_pvt_specification_by_specification_id** — Get specification by specification ID
- **brand_put_api_catalog_pvt_specification_by_specification_id** — Update specification
- **brand_post_api_catalog_pvt_specification** — Create specification
- **brand_specifications_field** — Get specification field
- **brand_specifications_insert_field** — Create specification field
- **brand_specifications_insert_field_update** — Update specification field
- **brand_specifications_get_field_value** — Get specification field value
- **brand_specifications_values_by_field_id** — Get specification values by specification field ID
- **brand_specifications_insert_field_value** — Create specification field value
- **brand_specifications_update_field_value** — Update specification field value
- **brand_get_api_catalog_pvt_specificationvalue_by_specification_value_id** — Get specification value
- **brand_put_api_catalog_pvt_specificationvalue_by_specification_value_id** — Update specification value
- **brand_post_api_catalog_pvt_specificationvalue** — Create specification value
- **brand_specifications_group_listby_category** — List specification group by category
- **brand_specifications_group_get** — Get specification group
- **brand_specification_group_insert2** — Create specification group
- **brand_put_api_catalog_pvt_specificationgroup_by_group_id** — Update specification group
- **brand_get_api_catalog_pvt_specification_nonstructured_by_id** — Get non-structured specification by ID
- **brand_delete_api_catalog_pvt_specification_nonstructured_by_id** — Delete non-structured specification
- **brand_get_api_catalog_pvt_specification_nonstructured** — Get non-structured specification by SKU ID
- **brand_delete_api_catalog_pvt_specification_nonstructured** — Delete non-structured specification by SKU ID
- **brand_sales_channel_list** — Get sales channel list
- **brand_sales_channelby_id** — Get sales channel by ID
- **brand_seller_list** — Get seller list
- **brand_get_sellerby_id** — Get seller by ID
- **brand_update_seller** — Update seller
- **brand_create_seller** — Create seller
- **brand_get_sellersby_id** — Get seller by ID
- **brand_post_api_catalog_pvt_supplier** — Create supplier
- **brand_put_api_catalog_pvt_supplier_by_supplier_id** — Update supplier
- **brand_delete_api_catalog_pvt_supplier_by_supplier_id** — Delete supplier
- **brand_get_api_catalog_pvt_product_by_product_id_salespolicy** — Get trade policies by product ID
- **brand_post_api_catalog_pvt_product_by_product_id_salespolicy_by_tradepolicy_id** — Associate product with trade policy
- **brand_delete_api_catalog_pvt_product_by_product_id_salespolicy_by_tradepolicy_id** — Remove product from trade policy
- **brand_get_api_catalog_system_pvt_sku_stockkeepingunitidsbysaleschannel** — List all SKUs of a trade policy
- **brand_indexed_info** — Get product indexed information
- **brand_get_all_commercial_conditions** — Get all commercial conditions
- **brand_get_commercial_conditions** — Get commercial condition
- **brand_get_gift_list** — Get gift list
- **brand_get_api_catalog_pvt_product_by_product_id_language** — Get product translation by product ID
- **brand_put_api_catalog_pvt_product_by_product_id_language** — Create or update product translation by product ID
- **brand_get_api_catalog_pvt_products_by_product_id_specification_by_specification_id_language** — Get product specification translation by product ID
- **brand_put_api_catalog_pvt_products_by_product_id_specification_by_specification_id_language** — Create or update product specification translation by product ID
- **brand_get_api_catalog_pvt_stockkeepingunit_by_sku_id_language** — Get SKU translation by SKU ID
- **brand_put_api_catalog_pvt_stockkeepingunit_by_sku_id_language** — Create or update SKU translation by SKU ID
- **brand_get_api_catalog_pvt_stockkeepingunit_by_sku_id_attribute_by_sku_attribute_id_language** — Get SKU attribute translation by SKU ID
- **brand_put_api_catalog_pvt_stockkeepingunit_by_sku_id_attribute_by_sku_attribute_id_language** — Create or update SKU attribute translation by SKU ID
- **brand_get_api_catalog_pvt_stockkeepingunit_by_sku_id_file_by_sku_file_id_language** — Get SKU file translation by SKU ID
- **brand_put_api_catalog_pvt_stockkeepingunit_by_sku_id_file_by_sku_file_id_language** — Create or update SKU file translation by SKU ID
- **brand_get_api_catalog_pvt_specificationgroup_by_specification_group_id_language** — Get specification group translation
- **brand_put_api_catalog_pvt_specificationgroup_by_specification_group_id_language** — Create or update specification group translation
- **brand_get_api_catalog_pvt_specification_by_specification_id_language** — Get specification translation
- **brand_put_api_catalog_pvt_specification_by_specification_id_language** — Create or update specification translation
- **brand_get_api_catalog_pvt_specificationvalue_by_value_id_language** — Get specification value translation
- **brand_put_api_catalog_pvt_specificationvalue_by_value_id_language** — Create or update specification value translation
- **brand_get_api_catalog_pvt_category_by_category_id_language** — Get category translation
- **brand_put_api_catalog_pvt_category_by_category_id_language** — Create or update category translation
- **brand_get_api_catalog_pvt_brand_by_brand_id_language** — Get brand translation
- **brand_put_api_catalog_pvt_brand_by_brand_id_language** — Create or update brand translation
- **brand_get_api_catalog_pvt_attachment_by_attachment_id_language** — Get attachment translation
- **brand_put_api_catalog_pvt_attachment_by_attachment_id_language** — Create or update attachment translation
- **brand_get_api_catalog_pvt_skuservicetype_by_sku_service_type_id_language** — Get SKU service type translation
- **brand_put_api_catalog_pvt_skuservicetype_by_sku_service_type_id_language** — Create or update SKU service type translation
- **brand_get_api_catalog_pvt_skuservice_by_skuservice_id_language** — Get SKU service translation
- **brand_put_api_catalog_pvt_skuservice_by_skuservice_id_language** — Create or update SKU service translation
- **brand_get_api_catalog_pvt_skuservicevalue_by_sku_service_value_id_language** — Get SKU service value translation
- **brand_put_api_catalog_pvt_skuservicevalue_by_sku_service_value_id_language** — Create or update SKU service value translation
- **brand_get_api_catalog_pvt_collection_by_collection_id_language** — Get collection translation
- **brand_put_api_catalog_pvt_collection_by_collection_id_language** — Create or update collection translation
