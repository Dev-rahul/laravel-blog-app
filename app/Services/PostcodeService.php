<?php
namespace App\Services;

use Illuminate\Support\Facades\Http;

class PostcodeService
{
    protected $baseUrl = 'https://api.postcodes.io/postcodes/';

    public function getPostcodeData($postcode)
    {
        try {
            $response = Http::get($this->baseUrl . $postcode);
            return $response->json();
        } catch (\Exception $e) {
            report($e);
            throw new \Exception('Failed to fetch postcode data');
        }
    }
}
