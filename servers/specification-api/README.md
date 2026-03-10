# VTEX Specification Api

MCP server for the VTEX Specification Api, providing AI assistants access to VTEX e-commerce APIs.

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
npx @vtex-mcp/specification-api
```

### Running with HTTP transport

```bash
npx @vtex-mcp/specification-api --transport http --port 3000
```

### MCP Client Configuration (Claude Desktop)

```json
{
  "mcpServers": {
    "specification-api": {
      "command": "npx",
      "args": ["@vtex-mcp/specification-api"],
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

- **specification_product_and_sku_ids** — Get product and SKU IDs
- **specification_get_productbyid** — Get product by ID
- **specification_put_api_catalog_pvt_product_by_product_id** — Update product
- **specification_productand_trade_policy** — Get product and its general context
- **specification_productby_ref_id** — Get product by reference ID
- **specification_product_variations** — Get product's SKUs by product ID
- **specification_get_api_addon_pvt_review_get_product_rate_by_product_id** — Get product review rate by product ID
- **specification_post_api_catalog_pvt_product** — Create product with category and brand
- **specification_get_product_specification** — Get product specifications by product ID
- **specification_update_product_specification** — Update product specification by product ID
- **specification_get_product_specificationby_product_id** — Get product specifications and their information by product ID
- **specification_post_api_catalog_pvt_product_by_product_id_specification** — Associate product specification
- **specification_delete_all_product_specifications** — Delete all product specifications by product ID
- **specification_deletea_product_specification** — Delete a product specification
- **specification_put_api_catalog_pvt_product_by_product_id_specificationvalue** — Associate product specification using specification name and group name
- **specification_listall_skui_ds** — List all SKU IDs
- **specification_sku_context** — Get SKU and context
- **specification_get_api_catalog_pvt_stockkeepingunit** — Get SKU by reference ID
- **specification_post_api_catalog_pvt_stockkeepingunit** — Create SKU
- **specification_sku_idby_ref_id** — Get SKU ID by reference ID
- **specification_skuby_alternate_id** — Get SKU by alternate ID
- **specification_skulistby_product_id** — Get SKU list by product ID
- **specification_sku_idlistby_ref_idlist** — Retrieve SKU ID list by reference ID list
- **specification_sku** — Get SKU
- **specification_put_api_catalog_pvt_stockkeepingunit_by_sku_id** — Update SKU
- **specification_get_sku_complementby_skuid** — Get SKU complement by SKU ID
- **specification_get_sku_complementsby_complement_type_id** — Get SKU complements by complement type ID
- **specification_get_sk_ucomplementsbytype** — Get SKU complements by type
- **specification_create_sku_complement** — Create SKU complement
- **specification_get_sku_complementby_sku_complement_id** — Get SKU complement by SKU complement ID
- **specification_delete_sku_complementby_sku_complement_id** — Delete SKU complement by SKU complement ID
- **specification_skuby_ean** — Get SKU by EAN
- **specification_get_api_catalog_pvt_stockkeepingunit_by_sku_id_ean** — Get EAN by SKU ID
- **specification_delete_api_catalog_pvt_stockkeepingunit_by_sku_id_ean** — Delete all SKU EAN values
- **specification_post_api_catalog_pvt_stockkeepingunit_by_sku_id_ean_by_ean** — Create SKU EAN
- **specification_delete_api_catalog_pvt_stockkeepingunit_by_sku_id_ean_by_ean** — Delete SKU EAN
- **specification_post_api_catalog_pvt_skuattachment** — Associate SKU attachment
- **specification_delete_api_catalog_pvt_skuattachment** — Dissociate attachments and SKUs
- **specification_get_api_catalog_pvt_stockkeepingunit_by_sku_id_attachment** — Get SKU attachments by SKU ID
- **specification_delete_api_catalog_pvt_skuattachment_by_sku_attachment_association_id** — Delete SKU attachment by attachment association ID
- **specification_associateattachmentsto_sku** — Associate attachments to an SKU
- **specification_get_api_catalog_pvt_stockkeepingunit_by_sku_id_file** — Get SKU files
- **specification_post_api_catalog_pvt_stockkeepingunit_by_sku_id_file** — Create SKU file
- **specification_delete_api_catalog_pvt_stockkeepingunit_by_sku_id_file** — Delete all SKU files
- **specification_put_api_catalog_pvt_stockkeepingunit_by_sku_id_file_by_sku_file_id** — Update SKU file
- **specification_delete_api_catalog_pvt_stockkeepingunit_by_sku_id_file_by_sku_file_id** — Delete SKU image file
- **specification_put_api_catalog_pvt_stockkeepingunit_by_sku_id_file_reorder** — Reorder SKU files
- **specification_put_api_catalog_pvt_stockkeepingunit_copy_by_sku_idfrom_by_sku_idto_file** — Copy files from an SKU to another SKU
- **specification_delete_api_catalog_pvt_stockkeepingunit_disassociate_by_sku_id_file_by_sku_file_id** — Disassociate SKU file
- **specification_get_api_catalog_pvt_stockkeepingunitkit** — Get SKU kit by SKU ID or parent SKU ID
- **specification_post_api_catalog_pvt_stockkeepingunitkit** — Create SKU kit
- **specification_delete_api_catalog_pvt_stockkeepingunitkit** — Delete SKU kit by SKU ID or parent SKU ID
- **specification_get_api_catalog_pvt_stockkeepingunitkit_by_kit_id** — Get SKU kit
- **specification_delete_api_catalog_pvt_stockkeepingunitkit_by_kit_id** — Delete SKU kit by kit ID
- **specification_get_sk_useller** — Get details of a seller's SKU
- **specification_delete_sk_usellerassociation** — Remove a seller's SKU binding
- **specification_post_api_catalog_system_pvt_skuseller_changenotification_by_seller_id_by_seller_sku_id** — Change notification with seller ID and seller SKU ID
- **specification_change_notification** — Change notification with SKU ID
- **specification_get_api_catalog_pvt_skuservice_by_sku_service_id** — Get SKU service
- **specification_put_api_catalog_pvt_skuservice_by_sku_service_id** — Update SKU service
- **specification_delete_api_catalog_pvt_skuservice_by_sku_service_id** — Dissociate SKU service
- **specification_post_api_catalog_pvt_skuservice** — Associate SKU service
- **specification_post_api_catalog_pvt_skuservicetypeattachment** — Associate SKU service attachment
- **specification_delete_api_catalog_pvt_skuservicetypeattachment** — Dissociate attachment by attachment ID or SKU service type ID
- **specification_delete_api_catalog_pvt_skuservicetypeattachment_by_sku_service_type_attachment_id** — Dissociate attachment from SKU service type
- **specification_post_api_catalog_pvt_skuservicetype** — Create SKU service type
- **specification_get_api_catalog_pvt_skuservicetype_by_sku_service_type_id** — Get SKU service type
- **specification_put_api_catalog_pvt_skuservicetype_by_sku_service_type_id** — Update SKU service type
- **specification_delete_api_catalog_pvt_skuservicetype_by_sku_service_type_id** — Delete SKU service type
- **specification_post_api_catalog_pvt_skuservicevalue** — Create SKU service value
- **specification_get_api_catalog_pvt_skuservicevalue_by_sku_service_value_id** — Get SKU service value
- **specification_put_api_catalog_pvt_skuservicevalue_by_sku_service_value_id** — Update SKU service value
- **specification_delete_api_catalog_pvt_skuservicevalue_by_sku_service_value_id** — Delete SKU service value
- **specification_get_api_catalog_pvt_stockkeepingunit_by_sku_id_specification** — Get SKU specifications
- **specification_post_api_catalog_pvt_stockkeepingunit_by_sku_id_specification** — Associate SKU specification
- **specification_put_api_catalog_pvt_stockkeepingunit_by_sku_id_specification** — Update SKU specification
- **specification_delete_api_catalog_pvt_stockkeepingunit_by_sku_id_specification** — Delete all SKU specifications
- **specification_delete_api_catalog_pvt_stockkeepingunit_by_sku_id_specification_by_specification_id** — Delete SKU specification
- **specification_put_api_catalog_pvt_stockkeepingunit_by_sku_id_specificationvalue** — Associate SKU specification using specification name and group name
- **specification_post_api_catalog_pvt_subcollection_by_sub_collection_id_stockkeepingunit** — Add SKU to subcollection
- **specification_delete_api_catalog_pvt_subcollection_by_sub_collection_id_stockkeepingunit_by_sku_id** — Delete SKU from subcollection
- **specification_category_tree** — Get category tree
- **specification_get_api_catalog_pvt_category_by_category_id** — Get category by ID
- **specification_put_api_catalog_pvt_category_by_category_id** — Update category
- **specification_post_api_catalog_pvt_category** — Create category
- **specification_get_api_catalog_pvt_product_by_product_id_similarcategory** — Get similar categories
- **specification_post_api_catalog_pvt_product_by_product_id_similarcategory_by_category_id** — Add similar category
- **specification_delete_api_catalog_pvt_product_by_product_id_similarcategory_by_category_id** — Delete similar category
- **specification_specifications_by_category_id** — Get specifications by category ID
- **specification_specifications_tree_by_category_id** — Get specifications tree by category ID
- **specification_post_api_catalog_pvt_subcollection_by_sub_collection_id_category** — Associate category to subcollection
- **specification_delete_api_catalog_pvt_subcollection_by_sub_collection_id_category_by_category_id** — Delete category from subcollection
- **specification_brand_list** — Get brand list
- **specification_brand_list_per_page** — Get paginated brand list
- **specification_brand** — Get brand by ID
- **specification_post_api_catalog_pvt_brand** — Create brand
- **specification_get_api_catalog_pvt_brand_by_brand_id** — Get brand and context
- **specification_put_api_catalog_pvt_brand_by_brand_id** — Update brand
- **specification_delete_api_catalog_pvt_brand_by_brand_id** — Delete brand
- **specification_post_api_catalog_pvt_subcollection_by_sub_collection_id_brand** — Associate brand to subcollection
- **specification_delete_api_catalog_pvt_subcollection_by_sub_collection_id_brand_by_brand_id** — Delete brand from subcollection
- **specification_get_api_catalog_pvt_attachment_by_attachmentid** — Get attachment by ID
- **specification_put_api_catalog_pvt_attachment_by_attachmentid** — Update attachment
- **specification_delete_api_catalog_pvt_attachment_by_attachmentid** — Delete attachment
- **specification_post_api_catalog_pvt_attachment** — Create attachment
- **specification_get_api_catalog_pvt_attachments** — Get all attachments
- **specification_get-all_inactive_collections** — Get all inactive collections
- **specification_post-create_collection** — Create collection
- **specification_get-importfileexample** — Import collection file example
- **specification_post-addproductsbyimportfile** — Add products to collection by imported file
- **specification_post-removeproductsbyimportfile** — Remove products from collection by imported file
- **specification_get-productsfromacollection** — Get products from a collection
- **specification_get_api_catalog_pvt_collection_by_collection_id** — Get collection by ID
- **specification_put_api_catalog_pvt_collection_by_collection_id** — Update collection
- **specification_delete_api_catalog_pvt_collection_by_collection_id** — Delete collection
- **specification_get_api_catalog_pvt_collection_by_collection_id_subcollection** — Get subcollection by collection ID
- **specification_get_api_catalog_pvt_subcollection_by_sub_collection_id** — Get subcollection by subcollection ID
- **specification_put_api_catalog_pvt_subcollection_by_sub_collection_id** — Update subcollection
- **specification_delete_api_catalog_pvt_subcollection_by_sub_collection_id** — Delete subcollection
- **specification_post_api_catalog_pvt_subcollection** — Create subcollection
- **specification_post_api_catalog_pvt_collection_by_collection_id_position** — Reposition SKU on the subcollection
- **specification_get_api_catalog_pvt_subcollection_by_sub_collection_id_specificationvalue** — Get specification values by subcollection ID
- **specification_post_api_catalog_pvt_subcollection_by_sub_collection_id_specificationvalue** — Use specification value in subcollection by ID
- **specification_delete_api_catalog_pvt_subcollection_by_sub_collection_id_specificationvalue** — Delete specification value from subcollection by ID
- **specification_get_api_catalog_pvt_specification_by_specification_id** — Get specification by specification ID
- **specification_put_api_catalog_pvt_specification_by_specification_id** — Update specification
- **specification_post_api_catalog_pvt_specification** — Create specification
- **specification_specifications_field** — Get specification field
- **specification_specifications_insert_field** — Create specification field
- **specification_specifications_insert_field_update** — Update specification field
- **specification_specifications_get_field_value** — Get specification field value
- **specification_specifications_values_by_field_id** — Get specification values by specification field ID
- **specification_specifications_insert_field_value** — Create specification field value
- **specification_specifications_update_field_value** — Update specification field value
- **specification_get_api_catalog_pvt_specificationvalue_by_specification_value_id** — Get specification value
- **specification_put_api_catalog_pvt_specificationvalue_by_specification_value_id** — Update specification value
- **specification_post_api_catalog_pvt_specificationvalue** — Create specification value
- **specification_specifications_group_listby_category** — List specification group by category
- **specification_specifications_group_get** — Get specification group
- **specification_specification_group_insert2** — Create specification group
- **specification_put_api_catalog_pvt_specificationgroup_by_group_id** — Update specification group
- **specification_get_api_catalog_pvt_specification_nonstructured_by_id** — Get non-structured specification by ID
- **specification_delete_api_catalog_pvt_specification_nonstructured_by_id** — Delete non-structured specification
- **specification_get_api_catalog_pvt_specification_nonstructured** — Get non-structured specification by SKU ID
- **specification_delete_api_catalog_pvt_specification_nonstructured** — Delete non-structured specification by SKU ID
- **specification_sales_channel_list** — Get sales channel list
- **specification_sales_channelby_id** — Get sales channel by ID
- **specification_seller_list** — Get seller list
- **specification_get_sellerby_id** — Get seller by ID
- **specification_update_seller** — Update seller
- **specification_create_seller** — Create seller
- **specification_get_sellersby_id** — Get seller by ID
- **specification_post_api_catalog_pvt_supplier** — Create supplier
- **specification_put_api_catalog_pvt_supplier_by_supplier_id** — Update supplier
- **specification_delete_api_catalog_pvt_supplier_by_supplier_id** — Delete supplier
- **specification_get_api_catalog_pvt_product_by_product_id_salespolicy** — Get trade policies by product ID
- **specification_post_api_catalog_pvt_product_by_product_id_salespolicy_by_tradepolicy_id** — Associate product with trade policy
- **specification_delete_api_catalog_pvt_product_by_product_id_salespolicy_by_tradepolicy_id** — Remove product from trade policy
- **specification_get_api_catalog_system_pvt_sku_stockkeepingunitidsbysaleschannel** — List all SKUs of a trade policy
- **specification_indexed_info** — Get product indexed information
- **specification_get_all_commercial_conditions** — Get all commercial conditions
- **specification_get_commercial_conditions** — Get commercial condition
- **specification_get_gift_list** — Get gift list
- **specification_get_api_catalog_pvt_product_by_product_id_language** — Get product translation by product ID
- **specification_put_api_catalog_pvt_product_by_product_id_language** — Create or update product translation by product ID
- **specification_get_api_catalog_pvt_products_by_product_id_specification_by_specification_id_language** — Get product specification translation by product ID
- **specification_put_api_catalog_pvt_products_by_product_id_specification_by_specification_id_language** — Create or update product specification translation by product ID
- **specification_get_api_catalog_pvt_stockkeepingunit_by_sku_id_language** — Get SKU translation by SKU ID
- **specification_put_api_catalog_pvt_stockkeepingunit_by_sku_id_language** — Create or update SKU translation by SKU ID
- **specification_get_api_catalog_pvt_stockkeepingunit_by_sku_id_attribute_by_sku_attribute_id_language** — Get SKU attribute translation by SKU ID
- **specification_put_api_catalog_pvt_stockkeepingunit_by_sku_id_attribute_by_sku_attribute_id_language** — Create or update SKU attribute translation by SKU ID
- **specification_get_api_catalog_pvt_stockkeepingunit_by_sku_id_file_by_sku_file_id_language** — Get SKU file translation by SKU ID
- **specification_put_api_catalog_pvt_stockkeepingunit_by_sku_id_file_by_sku_file_id_language** — Create or update SKU file translation by SKU ID
- **specification_get_api_catalog_pvt_specificationgroup_by_specification_group_id_language** — Get specification group translation
- **specification_put_api_catalog_pvt_specificationgroup_by_specification_group_id_language** — Create or update specification group translation
- **specification_get_api_catalog_pvt_specification_by_specification_id_language** — Get specification translation
- **specification_put_api_catalog_pvt_specification_by_specification_id_language** — Create or update specification translation
- **specification_get_api_catalog_pvt_specificationvalue_by_value_id_language** — Get specification value translation
- **specification_put_api_catalog_pvt_specificationvalue_by_value_id_language** — Create or update specification value translation
- **specification_get_api_catalog_pvt_category_by_category_id_language** — Get category translation
- **specification_put_api_catalog_pvt_category_by_category_id_language** — Create or update category translation
- **specification_get_api_catalog_pvt_brand_by_brand_id_language** — Get brand translation
- **specification_put_api_catalog_pvt_brand_by_brand_id_language** — Create or update brand translation
- **specification_get_api_catalog_pvt_attachment_by_attachment_id_language** — Get attachment translation
- **specification_put_api_catalog_pvt_attachment_by_attachment_id_language** — Create or update attachment translation
- **specification_get_api_catalog_pvt_skuservicetype_by_sku_service_type_id_language** — Get SKU service type translation
- **specification_put_api_catalog_pvt_skuservicetype_by_sku_service_type_id_language** — Create or update SKU service type translation
- **specification_get_api_catalog_pvt_skuservice_by_skuservice_id_language** — Get SKU service translation
- **specification_put_api_catalog_pvt_skuservice_by_skuservice_id_language** — Create or update SKU service translation
- **specification_get_api_catalog_pvt_skuservicevalue_by_sku_service_value_id_language** — Get SKU service value translation
- **specification_put_api_catalog_pvt_skuservicevalue_by_sku_service_value_id_language** — Create or update SKU service value translation
- **specification_get_api_catalog_pvt_collection_by_collection_id_language** — Get collection translation
- **specification_put_api_catalog_pvt_collection_by_collection_id_language** — Create or update collection translation
