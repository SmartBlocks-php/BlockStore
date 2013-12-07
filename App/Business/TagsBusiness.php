<?php
/**
 *
 */
 
namespace BlockStore;

class TagsBusiness {

    
    public static function findAll() {
    
    }
    
    public static function find($id) {
    
    }
    
    public static function destroy($id) {
    
    }
    
    public static function createOrUpdate($data) {
        $tag = null;
        if (isset($data['id'])) {
            $tag = \BlockStore\Tag::find($data['id']);

        }
        if (!is_object($tag)) {
            $em = \Model::getEntityManager();
            $qb = $em->createQueryBuilder();
            $qb->select('t')->from('\BlockStore\Tag', 't')->where('t.name = :name')->setParameter('name', $data['name']);
            $result = $qb->getQuery()->getResult();
            if (isset($result[0])) {
                $tag = $result[0];
            }
            if (!is_object($tag)) {
                $tag = new \BlockStore\Tag();
            }
            $tag->setName($data['name']);

            $tag->save();
            return $tag;
        }
    }
}