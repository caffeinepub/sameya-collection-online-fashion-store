import Array "mo:core/Array";
import Map "mo:core/Map";
import Text "mo:core/Text";
import List "mo:core/List";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";
import Blob "mo:core/Blob";
import Iter "mo:core/Iter";
import Time "mo:core/Time";
import Nat "mo:core/Nat";
import Int "mo:core/Int";
import Float "mo:core/Float";
import BlobStorage "blob-storage/Storage";
import MixinStorage "blob-storage/Mixin";

actor {
  include MixinStorage();

  type Currency = {
    amount : Float;
    currencyCode : Text;
  };

  module Product {
    public func compare(product1 : Product, product2 : Product) : Order.Order {
      Nat.compare(product1.id, product2.id);
    };

    public func compareByCategory(product1 : Product, product2 : Product) : Order.Order {
      switch (Text.compare(product1.category, product2.category)) {
        case (#equal) { Nat.compare(product1.id, product2.id) };
        case (order) { order };
      };
    };
  };

  type Product = {
    id : Nat;
    name : Text;
    description : Text;
    price : Currency;
    category : Text;
    images : [BlobStorage.ExternalBlob];
    sizes : [Text];
    colors : [Text];
    inventory : Nat;
    featured : Bool;
    createdAt : Int;
    updatedAt : Int;
  };

  module Category {
    public func compare(category1 : Category, category2 : Category) : Order.Order {
      Text.compare(category1.name, category2.name);
    };
  };

  type Category = {
    name : Text;
    description : Text;
  };

  type BrandInfo = {
    story : Text;
    mission : Text;
    values : Text;
    heritage : Text;
    craftsmanship : Text;
  };

  var nextProductId = 1;

  let products = Map.empty<Nat, Product>();
  let categories = Map.empty<Text, Category>();

  let defaultBrandInfo : BrandInfo = {
    story = "SaMeya Collection is a luxury fashion brand dedicated to timeless elegance and sophisticated design.";
    mission = "To empower women through high-quality, thoughtfully crafted fashion that celebrates individuality.";
    values = "Excellence, Innovation, Sustainability, Customer-Centricity";
    heritage = "Founded in 2024, SaMeya Collection blends classic influences with modern trends.";
    craftsmanship = "We use premium materials and expert artisans to ensure exceptional quality in every piece.";
  };

  var brandInfo = defaultBrandInfo;

  // Product Management
  public shared ({ caller }) func addProduct(name : Text, description : Text, price : Currency, category : Text, images : [BlobStorage.ExternalBlob], sizes : [Text], colors : [Text], inventory : Nat, featured : Bool) : async Nat {
    let productId = nextProductId;
    nextProductId += 1;

    let product : Product = {
      id = productId;
      name;
      description;
      price;
      category;
      images;
      sizes;
      colors;
      inventory;
      featured;
      createdAt = Time.now();
      updatedAt = Time.now();
    };

    products.add(productId, product);
    productId;
  };

  public query ({ caller }) func getProductsByCategory(category : Text) : async [Product] {
    products.values().toArray().filter(
      func(p) { p.category == category }
    ).sort(Product.compare : (Product, Product) -> Order.Order);
  };

  public query ({ caller }) func getFeaturedProducts() : async [Product] {
    products.values().toArray().filter(
      func(p) { p.featured }
    ).sort(Product.compare : (Product, Product) -> Order.Order);
  };

  public query ({ caller }) func searchProducts(searchTerm : Text) : async [Product] {
    products.values().toArray().filter(
      func(p) {
        p.name.toLower().contains(#text(searchTerm.toLower())) or
        p.description.toLower().contains(#text(searchTerm.toLower()))
      }
    ).sort(Product.compare : (Product, Product) -> Order.Order);
  };

  // Category Management
  public shared ({ caller }) func addCategory(name : Text, description : Text) : async () {
    let category : Category = {
      name;
      description;
    };

    categories.add(name, category);
  };

  public query ({ caller }) func getAllCategories() : async [Category] {
    categories.values().toArray().sort();
  };

  // Brand Info
  public query ({ caller }) func getBrandInfo() : async BrandInfo {
    brandInfo;
  };

  public shared ({ caller }) func updateBrandInfo(newInfo : BrandInfo) : async () {
    brandInfo := newInfo;
  };

  // Image Handling
  public shared ({ caller }) func uploadProductImage(productId : Nat, image : BlobStorage.ExternalBlob) : async () {
    switch (products.get(productId)) {
      case (null) {
        Runtime.trap("Product not found");
      };
      case (?product) {
        let updatedImages = [image];
        let updatedProduct : Product = {
          id = product.id;
          name = product.name;
          description = product.description;
          price = product.price;
          category = product.category;
          images = updatedImages;
          sizes = product.sizes;
          colors = product.colors;
          inventory = product.inventory;
          featured = product.featured;
          createdAt = product.createdAt;
          updatedAt = Time.now();
        };
        products.add(productId, updatedProduct);
      };
    };
  };
};
