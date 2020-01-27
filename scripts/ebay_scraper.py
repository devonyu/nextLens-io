import argparse
import requests
from lxml import html
import urllib3
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)


def get_average_price(url):
    url_without_sort = url.replace('&_sop=15', '')
    url_completed_listings = url_without_sort + \
        '&LH_Sold=1&LH_Complete=1&_sop=13&_ipg=50'
    # print(url_completed_listings)
    # print('above SHOUD BE THE RIGHT URL')
    # url_completed_listings = 'https://www.ebay.com/sch/i.html?_from=R40&_nkw=Sigma+50-100mm+F1.8+Canon&_sacat=0&LH_TitleDesc=0&rt=nc&LH_Sold=1&LH_Complete=1'
    headers = {
        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.103 Safari/537.36'}
    failed = False
    # Retries for handling network errors
    for _ in range(5):
        # print ("Retrieving %s"%(url_completed_listings))
        response = requests.get(url_completed_listings,
                                headers=headers, verify=False)
        parser = html.fromstring(response.text)
        # print ("Parsing page")
        if response.status_code != 200:
            failed = True
            continue
        else:
            failed = False
            break

    if failed:
        return []
    print(parser)
    product_listings = parser.xpath('//li[contains(@id,"results-listing")]')
    raw_result_count = parser.xpath(
        "//h1[contains(@class,'count-heading')]//text()")
    result_count = ''.join(raw_result_count).strip()
    print("Found {0} for {1}".format(result_count, url_completed_listings))
    sum_price = 0
    lowest_price = 99999
    highest_price = 0
    total_item_count = str(raw_result_count[0])
    item_name_search_query = raw_result_count[2]
    count = 0
    print(total_item_count)
    print('above is total item count')
    print(len(product_listings))
    print('above is product listings')
    for product in product_listings:
        # exclude ebay's results with fewer words as they should not apply
        # if count < int(total_item_count):
        #     count += 1
        print(product)
        raw_price = product.xpath(
            './/span[contains(@class,"s-item__price")]//text()')
        price_float_string = raw_price[0].replace('$', '')
        price_float_string = price_float_string.replace(',', '')
        price_float = round(float(price_float_string), 2)

        lowest_price = min(lowest_price, price_float)
        highest_price = max(highest_price, price_float)
        sum_price += price_float
    average_price = str(round((sum_price / int(total_item_count)), 2))
    result = {'lowest': lowest_price, 'highest': highest_price, 'average': average_price,
              'item_count': total_item_count, 'item_name': item_name_search_query}
    return result


if __name__ == "__main__":
    argparser = argparse.ArgumentParser()
    argparser.add_argument('url', help='URL')
    args = argparser.parse_args()
    url = args.url

    scraped_data = get_average_price(url)
    if scraped_data:
        print(scraped_data)
    else:
        print("No data scraped")
