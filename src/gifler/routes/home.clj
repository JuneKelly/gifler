(ns gifler.routes.home
  (:use compojure.core)
  (:require [gifler.views.layout :as layout]
            [gifler.util :as util]))

(defn home-page []
  (layout/render
    "base.html"))

(defroutes home-routes
  (GET "/" [] (home-page)))
