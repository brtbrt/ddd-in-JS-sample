.PHONY: build

PRICES_STATS_BACK_NAME := app-prices-stats

.PHONY: watch-hot-reload-app-prices-stats-backend
watch-app-backend:
	docker-compose up $(PRICES_STATS_BACK_NAME)-backend

.PHONY: terminal-app-prices-stats-backend
terminal-app-prices-stats-backend:
	@docker-compose exec $(PRICES_STATS_BACK_NAME)-backend bash

.PHONY: add-dep-app-backend
add-dep-app-backend:
	@docker-compose exec $(PRICES_STATS_BACK_NAME)-backend yarn add $(package)

.PHONY: add-dep-app-backend
add-flow-type-app-backend:
	@docker-compose exec $(PRICES_STATS_BACK_NAME)-backend yarn flow-typed install $(package)

.PHONY: watch-app-prices-stats-backend
watch-pack:
	docker-compose exec $(PRICES_STATS_BACK_NAME)-backend npx webpack --watch

