<?php
/**
 * Created by Antoine Jackson
 * User: Antoine Jackson
 * Date: 11/10/13
 * Time: 10:14 AM
 */

namespace BlockStore;

class BundleBlocksController extends \Controller {
    public function index() {
        $blocks = BundleBlockBusiness::findAll();

        $response = array();

        foreach ($blocks as $b) {
            $response[] = $b->toArray();
        }

        $this->return_json($response);
    }

    public function show($params = array()) {
        try {
            $block = BundleBlockBusiness::find($params["id"]);
            $this->return_json($block->toArray());
        } catch (BlockNotFoundException $e) {
            $this->json_error("The block was not found", 404);
        }
    }

    public function create($params = array()) {
        $data = $this->getRequestData();
        try {
            $block = BundleBlockBusiness::createOrUpdate($data);
            $this->return_json($block->toArray());
        } catch (UnauthorizedAccessException $e) {
            $this->json_error("You don't have the rights to edit", 403);
        }
    }

    public function update($params = array()) {
        $data = $this->getRequestData();
        if (isset($params["id"])) {
            $data["id"] = $params["id"];
        }
        try {
            $block = BundleBlockBusiness::createOrUpdate($data);
            $this->return_json($block->toArray());
        } catch (BlockNotFoundException $e) {
            $this->json_error("The block was not found", 404);
        } catch (UnauthorizedAccessException $e) {
            $this->json_error("You don't have the rights to edit", 403);
        }
    }

    public function destroy($params = array()) {
        try {
            $block = BundleBlockBusiness::find($params["id"]);
            BundleBlockBusiness::destroy($block);
        } catch (BlockNotFoundException $e) {
            $this->json_error("The block was not found", 404);
        } catch (UnauthorizedAccessException $e) {
            $this->json_error("You don't have the rights to edit", 403);
        }
    }
} 