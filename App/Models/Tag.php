<?php
/**
 * Date: 12/03/2013
 * Time: 11:28
 * This is the model class called Tag
 */
namespace BlockStore;
/**
 * @Entity @Table(name="block_store_tags")
 */
class Tag extends \Model {
    /**
     * @Id @GeneratedValue(strategy="AUTO") @Column(type="integer")
     */
    public $id;

    /**
     * @Column(type="string")
     */
    private $name;

    /**
     * @ManyToMany(targetEntity="\BlockStore\BundleBlock")
     */
    private $bundle_blocks;

    public function __construct() {
    }

    /**
     * @return integer
     */
    public function getId() {
        return $this->id;
    }

    /**
     * @param string $name
     */
    public function setName($name) {
        $this->name = $name;
    }

    /**
     * @return string
     */
    public function getName() {
        return $this->name;
    }

    /**
     * @return \BlockStore\BundleBlock[]
     */
    public function getBundleBlocks() {
        return $this->bundle_blocks;
    }

    /**
     * @return Tag[]
     */
    public function toArray() {
        $array = array(
            "id" => $this->id,
            "name" => $this->name
        );
        return $array;
    }
}