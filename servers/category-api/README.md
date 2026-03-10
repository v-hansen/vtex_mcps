# VTEX Category Api

MCP server for the VTEX Category Api, providing AI assistants access to VTEX e-commerce APIs.

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
npx @vtex-mcp/category-api
```

### Running with HTTP transport

```bash
npx @vtex-mcp/category-api --transport http --port 3000
```

### MCP Client Configuration (Claude Desktop)

```json
{
  "mcpServers": {
    "category-api": {
      "command": "npx",
      "args": ["@vtex-mcp/category-api"],
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

- **category_product_and_sku_ids** — Get product and SKU IDs
- **category_get_productbyid** — Get product by ID
- **category_put_api_catalog_pvt_product_by_product_id** — Update product
- **category_productand_trade_policy** — Get product and its general context
- **category_productby_ref_id** — Get product by reference ID
- **category_product_variations** — Get product's SKUs by product ID
- **category_get_api_addon_pvt_review_get_product_rate_by_product_id** — Get product review rate by product ID
- **category_post_api_catalog_pvt_product** — Create product with category and brand
- **category_get_product_specification** — Get product specifications by product ID
- **category_update_product_specification** — Update product specification by product ID
- **category_get_product_specificationby_product_id** — Get product specifications and their information by product ID
- **category_post_api_catalog_pvt_product_by_product_id_specification** — Associate product specification
- **category_delete_all_product_specifications** — Delete all product specifications by product ID
- **category_deletea_product_specification** — Delete a product specification
- **category_put_api_catalog_pvt_product_by_product_id_specificationvalue** — Associate product specification using specification name and group name
- **category_listall_skui_ds** — List all SKU IDs
- **category_sku_context** — Get SKU and context
- **category_get_api_catalog_pvt_stockkeepingunit** — Get SKU by reference ID
- **category_post_api_catalog_pvt_stockkeepingunit** — Create SKU
- **category_sku_idby_ref_id** — Get SKU ID by reference ID
- **category_skuby_alternate_id** — Get SKU by alternate ID
- **category_skulistby_product_id** — Get SKU list by product ID
- **category_sku_idlistby_ref_idlist** — Retrieve SKU ID list by reference ID list
- **category_sku** — Get SKU
- **category_put_api_catalog_pvt_stockkeepingunit_by_sku_id** — Update SKU
- **category_get_sku_complementby_skuid** — Get SKU complement by SKU ID
- **category_get_sku_complementsby_complement_type_id** — Get SKU complements by complement type ID
- **category_get_sk_ucomplementsbytype** — Get SKU complements by type
- **category_create_sku_complement** — Create SKU complement
- **category_get_sku_complementby_sku_complement_id** — Get SKU complement by SKU complement ID
- **category_delete_sku_complementby_sku_complement_id** — Delete SKU complement by SKU complement ID
- **category_skuby_ean** — Get SKU by EAN
- **category_get_api_catalog_pvt_stockkeepingunit_by_sku_id_ean** — Get EAN by SKU ID
- **category_delete_api_catalog_pvt_stockkeepingunit_by_sku_id_ean** — Delete all SKU EAN values
- **category_post_api_catalog_pvt_stockkeepingunit_by_sku_id_ean_by_ean** — Create SKU EAN
- **category_delete_api_catalog_pvt_stockkeepingunit_by_sku_id_ean_by_ean** — Delete SKU EAN
- **category_post_api_catalog_pvt_skuattachment** — Associate SKU attachment
- **category_delete_api_catalog_pvt_skuattachment** — Dissociate attachments and SKUs
- **category_get_api_catalog_pvt_stockkeepingunit_by_sku_id_attachment** — Get SKU attachments by SKU ID
- **category_delete_api_catalog_pvt_skuattachment_by_sku_attachment_association_id** — Delete SKU attachment by attachment association ID
- **category_associateattachmentsto_sku** — Associate attachments to an SKU
- **category_get_api_catalog_pvt_stockkeepingunit_by_sku_id_file** — Get SKU files
- **category_post_api_catalog_pvt_stockkeepingunit_by_sku_id_file** — Create SKU file
- **category_delete_api_catalog_pvt_stockkeepingunit_by_sku_id_file** — Delete all SKU files
- **category_put_api_catalog_pvt_stockkeepingunit_by_sku_id_file_by_sku_file_id** — Update SKU file
- **category_delete_api_catalog_pvt_stockkeepingunit_by_sku_id_file_by_sku_file_id** — Delete SKU image file
- **category_put_api_catalog_pvt_stockkeepingunit_by_sku_id_file_reorder** — Reorder SKU files
- **category_put_api_catalog_pvt_stockkeepingunit_copy_by_sku_idfrom_by_sku_idto_file** — Copy files from an SKU to another SKU
- **category_delete_api_catalog_pvt_stockkeepingunit_disassociate_by_sku_id_file_by_sku_file_id** — Disassociate SKU file
- **category_get_api_catalog_pvt_stockkeepingunitkit** — Get SKU kit by SKU ID or parent SKU ID
- **category_post_api_catalog_pvt_stockkeepingunitkit** — Create SKU kit
- **category_delete_api_catalog_pvt_stockkeepingunitkit** — Delete SKU kit by SKU ID or parent SKU ID
- **category_get_api_catalog_pvt_stockkeepingunitkit_by_kit_id** — Get SKU kit
- **category_delete_api_catalog_pvt_stockkeepingunitkit_by_kit_id** — Delete SKU kit by kit ID
- **category_get_sk_useller** — Get details of a seller's SKU
- **category_delete_sk_usellerassociation** — Remove a seller's SKU binding
- **category_post_api_catalog_system_pvt_skuseller_changenotification_by_seller_id_by_seller_sku_id** — Change notification with seller ID and seller SKU ID
- **category_change_notification** — Change notification with SKU ID
- **category_get_api_catalog_pvt_skuservice_by_sku_service_id** — Get SKU service
- **category_put_api_catalog_pvt_skuservice_by_sku_service_id** — Update SKU service
- **category_delete_api_catalog_pvt_skuservice_by_sku_service_id** — Dissociate SKU service
- **category_post_api_catalog_pvt_skuservice** — Associate SKU service
- **category_post_api_catalog_pvt_skuservicetypeattachment** — Associate SKU service attachment
- **category_delete_api_catalog_pvt_skuservicetypeattachment** — Dissociate attachment by attachment ID or SKU service type ID
- **category_delete_api_catalog_pvt_skuservicetypeattachment_by_sku_service_type_attachment_id** — Dissociate attachment from SKU service type
- **category_post_api_catalog_pvt_skuservicetype** — Create SKU service type
- **category_get_api_catalog_pvt_skuservicetype_by_sku_service_type_id** — Get SKU service type
- **category_put_api_catalog_pvt_skuservicetype_by_sku_service_type_id** — Update SKU service type
- **category_delete_api_catalog_pvt_skuservicetype_by_sku_service_type_id** — Delete SKU service type
- **category_post_api_catalog_pvt_skuservicevalue** — Create SKU service value
- **category_get_api_catalog_pvt_skuservicevalue_by_sku_service_value_id** — Get SKU service value
- **category_put_api_catalog_pvt_skuservicevalue_by_sku_service_value_id** — Update SKU service value
- **category_delete_api_catalog_pvt_skuservicevalue_by_sku_service_value_id** — Delete SKU service value
- **category_get_api_catalog_pvt_stockkeepingunit_by_sku_id_specification** — Get SKU specifications
- **category_post_api_catalog_pvt_stockkeepingunit_by_sku_id_specification** — Associate SKU specification
- **category_put_api_catalog_pvt_stockkeepingunit_by_sku_id_specification** — Update SKU specification
- **category_delete_api_catalog_pvt_stockkeepingunit_by_sku_id_specification** — Delete all SKU specifications
- **category_delete_api_catalog_pvt_stockkeepingunit_by_sku_id_specification_by_specification_id** — Delete SKU specification
- **category_put_api_catalog_pvt_stockkeepingunit_by_sku_id_specificationvalue** — Associate SKU specification using specification name and group name
- **category_post_api_catalog_pvt_subcollection_by_sub_collection_id_stockkeepingunit** — Add SKU to subcollection
- **category_delete_api_catalog_pvt_subcollection_by_sub_collection_id_stockkeepingunit_by_sku_id** — Delete SKU from subcollection
- **category_category_tree** — Get category tree
- **category_get_api_catalog_pvt_category_by_category_id** — Get category by ID
- **category_put_api_catalog_pvt_category_by_category_id** — Update category
- **category_post_api_catalog_pvt_category** — Create category
- **category_get_api_catalog_pvt_product_by_product_id_similarcategory** — Get similar categories
- **category_post_api_catalog_pvt_product_by_product_id_similarcategory_by_category_id** — Add similar category
- **category_delete_api_catalog_pvt_product_by_product_id_similarcategory_by_category_id** — Delete similar category
- **category_specifications_by_category_id** — Get specifications by category ID
- **category_specifications_tree_by_category_id** — Get specifications tree by category ID
- **category_post_api_catalog_pvt_subcollection_by_sub_collection_id_category** — Associate category to subcollection
- **category_delete_api_catalog_pvt_subcollection_by_sub_collection_id_category_by_category_id** — Delete category from subcollection
- **category_brand_list** — Get brand list
- **category_brand_list_per_page** — Get paginated brand list
- **category_brand** — Get brand by ID
- **category_post_api_catalog_pvt_brand** — Create brand
- **category_get_api_catalog_pvt_brand_by_brand_id** — Get brand and context
- **category_put_api_catalog_pvt_brand_by_brand_id** — Update brand
- **category_delete_api_catalog_pvt_brand_by_brand_id** — Delete brand
- **category_post_api_catalog_pvt_subcollection_by_sub_collection_id_brand** — Associate brand to subcollection
- **category_delete_api_catalog_pvt_subcollection_by_sub_collection_id_brand_by_brand_id** — Delete brand from subcollection
- **category_get_api_catalog_pvt_attachment_by_attachmentid** — Get attachment by ID
- **category_put_api_catalog_pvt_attachment_by_attachmentid** — Update attachment
- **category_delete_api_catalog_pvt_attachment_by_attachmentid** — Delete attachment
- **category_post_api_catalog_pvt_attachment** — Create attachment
- **category_get_api_catalog_pvt_attachments** — Get all attachments
- **category_get-all_inactive_collections** — Get all inactive collections
- **category_post-create_collection** — Create collection
- **category_get-importfileexample** — Import collection file example
- **category_post-addproductsbyimportfile** — Add products to collection by imported file
- **category_post-removeproductsbyimportfile** — Remove products from collection by imported file
- **category_get-productsfromacollection** — Get products from a collection
- **category_get_api_catalog_pvt_collection_by_collection_id** — Get collection by ID
- **category_put_api_catalog_pvt_collection_by_collection_id** — Update collection
- **category_delete_api_catalog_pvt_collection_by_collection_id** — Delete collection
- **category_get_api_catalog_pvt_collection_by_collection_id_subcollection** — Get subcollection by collection ID
- **category_get_api_catalog_pvt_subcollection_by_sub_collection_id** — Get subcollection by subcollection ID
- **category_put_api_catalog_pvt_subcollection_by_sub_collection_id** — Update subcollection
- **category_delete_api_catalog_pvt_subcollection_by_sub_collection_id** — Delete subcollection
- **category_post_api_catalog_pvt_subcollection** — Create subcollection
- **category_post_api_catalog_pvt_collection_by_collection_id_position** — Reposition SKU on the subcollection
- **category_get_api_catalog_pvt_subcollection_by_sub_collection_id_specificationvalue** — Get specification values by subcollection ID
- **category_post_api_catalog_pvt_subcollection_by_sub_collection_id_specificationvalue** — Use specification value in subcollection by ID
- **category_delete_api_catalog_pvt_subcollection_by_sub_collection_id_specificationvalue** — Delete specification value from subcollection by ID
- **category_get_api_catalog_pvt_specification_by_specification_id** — Get specification by specification ID
- **category_put_api_catalog_pvt_specification_by_specification_id** — Update specification
- **category_post_api_catalog_pvt_specification** — Create specification
- **category_specifications_field** — Get specification field
- **category_specifications_insert_field** — Create specification field
- **category_specifications_insert_field_update** — Update specification field
- **category_specifications_get_field_value** — Get specification field value
- **category_specifications_values_by_field_id** — Get specification values by specification field ID
- **category_specifications_insert_field_value** — Create specification field value
- **category_specifications_update_field_value** — Update specification field value
- **category_get_api_catalog_pvt_specificationvalue_by_specification_value_id** — Get specification value
- **category_put_api_catalog_pvt_specificationvalue_by_specification_value_id** — Update specification value
- **category_post_api_catalog_pvt_specificationvalue** — Create specification value
- **category_specifications_group_listby_category** — List specification group by category
- **category_specifications_group_get** — Get specification group
- **category_specification_group_insert2** — Create specification group
- **category_put_api_catalog_pvt_specificationgroup_by_group_id** — Update specification group
- **category_get_api_catalog_pvt_specification_nonstructured_by_id** — Get non-structured specification by ID
- **category_delete_api_catalog_pvt_specification_nonstructured_by_id** — Delete non-structured specification
- **category_get_api_catalog_pvt_specification_nonstructured** — Get non-structured specification by SKU ID
- **category_delete_api_catalog_pvt_specification_nonstructured** — Delete non-structured specification by SKU ID
- **category_sales_channel_list** — Get sales channel list
- **category_sales_channelby_id** — Get sales channel by ID
- **category_seller_list** — Get seller list
- **category_get_sellerby_id** — Get seller by ID
- **category_update_seller** — Update seller
- **category_create_seller** — Create seller
- **category_get_sellersby_id** — Get seller by ID
- **category_post_api_catalog_pvt_supplier** — Create supplier
- **category_put_api_catalog_pvt_supplier_by_supplier_id** — Update supplier
- **category_delete_api_catalog_pvt_supplier_by_supplier_id** — Delete supplier
- **category_get_api_catalog_pvt_product_by_product_id_salespolicy** — Get trade policies by product ID
- **category_post_api_catalog_pvt_product_by_product_id_salespolicy_by_tradepolicy_id** — Associate product with trade policy
- **category_delete_api_catalog_pvt_product_by_product_id_salespolicy_by_tradepolicy_id** — Remove product from trade policy
- **category_get_api_catalog_system_pvt_sku_stockkeepingunitidsbysaleschannel** — List all SKUs of a trade policy
- **category_indexed_info** — Get product indexed information
- **category_get_all_commercial_conditions** — Get all commercial conditions
- **category_get_commercial_conditions** — Get commercial condition
- **category_get_gift_list** — Get gift list
- **category_get_api_catalog_pvt_product_by_product_id_language** — Get product translation by product ID
- **category_put_api_catalog_pvt_product_by_product_id_language** — Create or update product translation by product ID
- **category_get_api_catalog_pvt_products_by_product_id_specification_by_specification_id_language** — Get product specification translation by product ID
- **category_put_api_catalog_pvt_products_by_product_id_specification_by_specification_id_language** — Create or update product specification translation by product ID
- **category_get_api_catalog_pvt_stockkeepingunit_by_sku_id_language** — Get SKU translation by SKU ID
- **category_put_api_catalog_pvt_stockkeepingunit_by_sku_id_language** — Create or update SKU translation by SKU ID
- **category_get_api_catalog_pvt_stockkeepingunit_by_sku_id_attribute_by_sku_attribute_id_language** — Get SKU attribute translation by SKU ID
- **category_put_api_catalog_pvt_stockkeepingunit_by_sku_id_attribute_by_sku_attribute_id_language** — Create or update SKU attribute translation by SKU ID
- **category_get_api_catalog_pvt_stockkeepingunit_by_sku_id_file_by_sku_file_id_language** — Get SKU file translation by SKU ID
- **category_put_api_catalog_pvt_stockkeepingunit_by_sku_id_file_by_sku_file_id_language** — Create or update SKU file translation by SKU ID
- **category_get_api_catalog_pvt_specificationgroup_by_specification_group_id_language** — Get specification group translation
- **category_put_api_catalog_pvt_specificationgroup_by_specification_group_id_language** — Create or update specification group translation
- **category_get_api_catalog_pvt_specification_by_specification_id_language** — Get specification translation
- **category_put_api_catalog_pvt_specification_by_specification_id_language** — Create or update specification translation
- **category_get_api_catalog_pvt_specificationvalue_by_value_id_language** — Get specification value translation
- **category_put_api_catalog_pvt_specificationvalue_by_value_id_language** — Create or update specification value translation
- **category_get_api_catalog_pvt_category_by_category_id_language** — Get category translation
- **category_put_api_catalog_pvt_category_by_category_id_language** — Create or update category translation
- **category_get_api_catalog_pvt_brand_by_brand_id_language** — Get brand translation
- **category_put_api_catalog_pvt_brand_by_brand_id_language** — Create or update brand translation
- **category_get_api_catalog_pvt_attachment_by_attachment_id_language** — Get attachment translation
- **category_put_api_catalog_pvt_attachment_by_attachment_id_language** — Create or update attachment translation
- **category_get_api_catalog_pvt_skuservicetype_by_sku_service_type_id_language** — Get SKU service type translation
- **category_put_api_catalog_pvt_skuservicetype_by_sku_service_type_id_language** — Create or update SKU service type translation
- **category_get_api_catalog_pvt_skuservice_by_skuservice_id_language** — Get SKU service translation
- **category_put_api_catalog_pvt_skuservice_by_skuservice_id_language** — Create or update SKU service translation
- **category_get_api_catalog_pvt_skuservicevalue_by_sku_service_value_id_language** — Get SKU service value translation
- **category_put_api_catalog_pvt_skuservicevalue_by_sku_service_value_id_language** — Create or update SKU service value translation
- **category_get_api_catalog_pvt_collection_by_collection_id_language** — Get collection translation
- **category_put_api_catalog_pvt_collection_by_collection_id_language** — Create or update collection translation
