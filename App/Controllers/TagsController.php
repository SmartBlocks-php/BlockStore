<?php
/**
 *
 */
 
namespace BlockStore;

class TagsController extends \Controller {

    public function index() {
        $em = \Model::getEntityManager();

        $qb = $em->createQueryBuilder();

        $qb->select("t")->from('\BlockStore\Tag', 't')->join('t.bundle_blocks', 'block');

        $results = $qb->getQuery()->getResult();

        $response = array();

        foreach ($results as $result) {
            $response[] = $result->toArray();
        }

        $this->return_json($response);
    }
    
    public function show($params = array()) {
        $tag = \BlockStore\Tag::find($params['id']);

        if (is_object($tag)) {
            $this->return_json($tag);
        } else {
            $this->json_error('This tag was not found.', 404);
        }
    }
    
    public function create($params = array()) {
        $data = $this->getRequestData();
        if (\User::current_user()->logged_in()) {
            $tag = TagsBusiness::createOrUpdate($data);
            $this->return_json($tag);
        } else {
            $this->json_error('You cannot add tags as anonymous', 403);
        }
    }
    
    public function update($params = array()) {
        $data = $this->getRequestData();
        if (\User::current_user()->logged_in() && \User::current_user()->is_admin()) {
            $tag = TagsBusiness::createOrUpdate($data);
            $this->return_json($tag);
        } else {
            $this->json_error('This tag was not found', 404);
        }
    }
    
    public function destroy($params = array()) {
        $tag = \BlockStore\Tag::find($params['id']);
        if (\User::current_user()->logged_in() && \User::current_user()->is_admin() && is_object($tag)) {
            $tag->delete();
            $this->json_message('The tag was succesfully deleted');
        } else {
            $this->json_error('This tag was not found', 404);
        }
    }
}