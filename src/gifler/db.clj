(ns gifler.db
  (:require [environ.core :refer [env]]
            [monger.core :as mg]
            [monger.collection :as mc]
            [monger.query :as mq]))


(mg/connect-via-uri! (env :db-uri))


(defn get-things []
  (mc/find-maps "things" {}))
