<?php
/**
 *
 */
 
namespace BlockStore;

class TagsController extends \Controller {

    public function index() {
        $em = \Model::getEntityManager();

        $qb = $em->createQueryBuilder();

        $qb->select("t")->from('\BlockStore\Tag', 't')->leftJoin('t.bundle_blocks', 'block')->where('block is NOT NULL');

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
        $this->render_layout = false;
    }
    
    public function update($params = array()) {
        $this->render_layout = false;
    }
    
    public function destroy($params = array()) {
        $this->render_layout = false;
    }
}