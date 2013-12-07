<?php
/**
 * Created by Antoine Jackson
 * User: Antoine Jackson
 * Date: 11/10/13
 * Time: 11:28 AM
 */

namespace BlockStore;

class BundleBlockBusiness {
    public static function findAll() {
        $em = \Model::getEntityManager();

        $qb = $em->createQueryBuilder();

        $qb->select('b')->from('\BlockStore\BundleBlock', 'b');

        $results = $qb->getQuery()->getResult();

        return $results;
    }

    public static function find($id) {
        $block = BundleBlock::find($id);
        if (!is_object($block)) {
            throw new BlockNotFoundException();
        }
        return $block;
    }

    /**
     * @param array $data
     * @return BundleBlock
     * @throws UnauthorizedAccessException
     */
    public static function createOrUpdate($data) {
        if (isset($data["id"])) {
            $block = BundleBlock::find($data["id"]);
        }
        if (!isset($block) || !is_object($block)) {
            $block = new BundleBlock();
        }
        else {
            if ($block->getCreator()->getId() != \User::current_user()->getId()) {
                throw new UnauthorizedAccessException();
            }
        }

        if (isset($data["name"])) {
            $block->setName($data["name"]);
            unset($data["name"]);
        }

        if (isset($data["description"])) {
            $block->setDescription($data["description"]);
            unset($data["description"]);
        }

        $block->setLastUpdated(new \DateTime());
        unset($data["created"]);
        unset($data["last_updated"]);

        if ($block->getCreator() == null) {
            $block->setCreator(\User::current_user());
        }
        unset($data["creator"]);

        unset($data['url']);

        if (isset($data["tags"])) {
            if (is_array($data["tags"])) {
                $block->getTags()->clear();
                foreach ($data["tags"] as $tagarray) {
                    $tag = null;
                    if (isset($tagarray['id'])) {
                        $tag = \BlockStore\Tag::find($tagarray['id']);
                    }
                    if (!is_object($tag)) {
                        $tag = new \BlockStore\Tag();
                        $tag->setName($tagarray['name']);
                        $tag->save();
                    }
                    $block->getTags()->add($tag);
                }
            }
            unset($data["tags"]);
        }

        $block_data = $block->getData();

        foreach ($data as $k => $v) {
            $block_data[$k] = $v;
        }

        foreach ($block_data as $k => $v) {
            if (!isset($data[$k])) {
                unset($block_data[$k]);
            }
        }

        $block->setData($block_data);

        $block->save();
        return $block;
    }

    public static function destroy($block) {
        if (!is_object($block)) {
            throw new BlockNotFoundException();
        }
        if ($block->getCreator()->getId() != \User::current_user()->getId()) {
            throw new UnauthorizedAccessException();
        }
        $block->delete();
    }
} 