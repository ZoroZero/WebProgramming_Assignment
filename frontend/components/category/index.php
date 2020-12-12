<!-- start category -->
<section id="category">
    <div class="container my-4">
        <h4 class="font-rubik font-size-20">Browsing category/search result product-name here</h4>

        <!--filter box-->
        <div class="p-3 mb-2 bg-light text-secondary shadow w-50">
            <h4 class="font-rubik font-size-20">FILTER</h4>

            <div id="filters" class="button-group text-left font-baloo font-size-20">
                <p style="display:inline;font-weight:bold;">Brand</p>
                <button class="btn" id='filter-all' data-filter='*'>All brand</button>
                <button class="btn" id='filter-windows' data-filter='.Windows'>Windows</button>
                <button class="btn" data-filter='.Mac'>Mac</button>
                <button class="btn" data-filter='.Linux'>Linux</button>
            </div>

            <!--FILTER CỦA ĐẠT-->
            <div id="filters" class="button-group-sort text-left font-baloo font-size-20">
                <p style="display:inline;font-weight:bold;">Price</p>
                <button class="btn" direction="asc" data-filter='productprice'>Ascending</button>
                <button class="btn" direction="desc" data-filter='productprice'>Descending</button>
            </div>

            <div id="filters" class="button-group-sort text-left font-baloo font-size-20">
                <p style="display:inline;font-weight:bold;">Name</p>
                <button class="btn" direction="asc" data-filter='productname'>A-Z</button>
                <button class="btn" direction="desc" data-filter='productname'>Z-A</button>
            </div>

            <div id="filters" class="button-group-sort text-left font-baloo font-size-20">
                <p style="display:inline;font-weight:bold;">Original</p>
                <button class="btn" direction="asc" data-filter='original-order'>Ascending</button>
                <button class="btn" direction="desc" data-filter='original-order'>Descending</button>
            </div>
            <!--END FILTER CỦA ĐẠT-->
        </div>
        <!--end filter box-->

        <div class="grid" id='products-grid'>
            
        </div>
    </div>
</section>
<!-- end category -->