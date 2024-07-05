<script lang="ts">
    export let title = 'invoicelink.io';
    export let description = 'Making it easy to get paid digitally.';
    export let imageUrl = 'https://app.invoicelink.io/og-image.png';
</script>

<title>{title}</title>
<meta name="description" content={description} />
<!-- open graph tags -->
<meta property="og:title" content={title} />
<meta property="og:type" content="website" />
<meta property="og:url" content="https://app.invoicelink.io" />
<meta property="og:description" content={description} />
<meta property="og:image" content={imageUrl} />
<!-- optional open graph tags -->
<meta property="og:site_name" content="invoicelink" />
<meta property="og:locale" content="en_ZA" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<!-- twitter content -->
<meta name="twitter:card" content="summary_large_image" />
<meta property="twitter:domain" content="app.invoicelink.io" />
<meta name="twitter:title" content="Pay Now" />
<meta name="twitter:description" content={description} />
<meta name="twitter:image" content={imageUrl} />
